import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

test('the real CLI versions private packages, propagates runtime dependencies and consumes changesets', (t) => {
  const repo = mkdtempSync(path.join(os.tmpdir(), 'gdg-version-'))
  t.after(() => rmSync(repo, { recursive: true, force: true }))
  const root = fileURLToPath(new URL('../', import.meta.url))
  const write = (file, value) => {
    mkdirSync(path.dirname(path.join(repo, file)), { recursive: true })
    writeFileSync(path.join(repo, file), value)
  }
  const pkg = (dir, name, dependencies = {}, devDependencies = {}) =>
    write(
      `${dir}/package.json`,
      JSON.stringify({
        name,
        version: '0.0.0',
        private: true,
        dependencies,
        devDependencies,
      }),
    )
  pkg('.', 'fixture')
  pkg('packages/config', '@gdg/config')
  pkg('packages/wowds', '@gdg/wowds', {}, { '@gdg/config': 'workspace:*' })
  pkg(
    'apps/landing',
    '@gdg/landing',
    { '@gdg/wowds': 'workspace:*' },
    { '@gdg/config': 'workspace:*' },
  )
  write('pnpm-workspace.yaml', "packages:\n  - 'apps/*'\n  - 'packages/*'\n")
  write('.changeset/ui.md', '---\n"@gdg/wowds": minor\n---\nAdd a compatible UI option.\n')
  copyFileSync(path.join(root, '.changeset/config.json'), path.join(repo, '.changeset/config.json'))
  symlinkSync(path.join(root, 'node_modules'), path.join(repo, 'node_modules'), 'dir')
  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: 'pipe' })
  git('init', '-q', '-b', 'develop')
  git('config', 'user.name', 'Version Test')
  git('config', 'user.email', 'version@example.invalid')
  git('config', 'core.hooksPath', '.git/hooks')
  git('add', '.')
  git('commit', '-qm', 'Fixture')
  const version = () =>
    execFileSync(
      process.execPath,
      [path.join(root, 'node_modules/@changesets/cli/bin.js'), 'version'],
      { cwd: repo, encoding: 'utf8', stdio: 'pipe' },
    )
  const manifest = (dir) => JSON.parse(readFileSync(path.join(repo, dir, 'package.json'), 'utf8'))

  version()
  assert.equal(manifest('packages/wowds').version, '0.1.0')
  assert.equal(manifest('apps/landing').version, '0.0.1')
  assert.equal(manifest('packages/config').version, '0.0.0')
  assert.equal(existsSync(path.join(repo, '.changeset/ui.md')), false)
  assert.match(
    readFileSync(path.join(repo, 'packages/wowds/CHANGELOG.md'), 'utf8'),
    /Add a compatible UI option/,
  )
  version()
  assert.equal(manifest('apps/landing').version, '0.0.1')

  write('.changeset/config.md', '---\n"@gdg/config": patch\n---\nUpdate shared checks.\n')
  version()
  assert.equal(manifest('packages/config').version, '0.0.1')
  assert.equal(manifest('packages/wowds').version, '0.1.0')
  assert.equal(manifest('apps/landing').version, '0.0.1')
})
