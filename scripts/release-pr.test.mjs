import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

test('release metadata uses prepared versions and rejects pending changesets or missing changelogs', (t) => {
  const repo = mkdtempSync(path.join(os.tmpdir(), 'gdg-release-pr-'))
  t.after(() => rmSync(repo, { recursive: true, force: true }))
  const git = (...args) =>
    execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: 'pipe' }).trim()
  const write = (file, content) => {
    mkdirSync(path.dirname(path.join(repo, file)), { recursive: true })
    writeFileSync(path.join(repo, file), content)
  }
  const pkg = (dir, name, version) =>
    write(`${dir}/package.json`, JSON.stringify({ name, version, private: true }))
  const commit = () => {
    git('add', '.')
    git('commit', '-qm', 'Fixture')
  }
  const inspect = () =>
    execFileSync(
      process.execPath,
      [fileURLToPath(new URL('./release-pr.mjs', import.meta.url)), 'main', 'HEAD'],
      { cwd: repo, encoding: 'utf8', stdio: 'pipe' },
    )

  git('init', '-q', '-b', 'main')
  git('config', 'user.name', 'Release Test')
  git('config', 'user.email', 'release@example.invalid')
  git('config', 'core.hooksPath', '.git/hooks')
  pkg('.', 'root', '0.0.0')
  pkg('apps/web', '@sample/web', '0.0.0')
  pkg('packages/wowds', '@sample/wowds', '0.0.0')
  pkg('packages/config', '@sample/config', '0.0.0')
  write('.changeset/README.md', '# Instructions\n')
  commit()
  git('checkout', '-qb', 'develop')
  write('.changeset/empty.md', '---\n---\n')
  write('README.md', 'Tooling update\n')
  commit()
  assert.deepEqual(JSON.parse(inspect()), { title: 'chore: sync develop to main', releases: [] })

  write('.changeset/feature.md', "---\n'@sample/wowds': minor\n---\nNew component\n")
  commit()
  assert.throws(inspect, /Unreleased changeset/)

  pkg('.', 'root', '9.0.0')
  pkg('apps/web', '@sample/web', '0.0.1')
  pkg('packages/wowds', '@sample/wowds', '0.1.0')
  write('apps/web/CHANGELOG.md', '# @sample/web\n\n## 0.0.1\n\nDependency update\n')
  write('packages/wowds/CHANGELOG.md', '# @sample/wowds\n\n## 0.1.0\n\nNew component\n')
  rmSync(path.join(repo, '.changeset/feature.md'))
  commit()
  assert.deepEqual(JSON.parse(inspect()), {
    title: 'release: @sample/web@0.0.1, @sample/wowds@0.1.0',
    releases: [
      { name: '@sample/web', oldVersion: '0.0.0', version: '0.0.1' },
      { name: '@sample/wowds', oldVersion: '0.0.0', version: '0.1.0' },
    ],
  })

  write('.changeset/late-feature.md', "---\n'@sample/web': patch\n---\nAdded after preparation\n")
  commit()
  assert.throws(inspect, /Unreleased changeset/)
  rmSync(path.join(repo, '.changeset/late-feature.md'))
  write('packages/wowds/CHANGELOG.md', '# @sample/wowds\n\n## 0.1.0\n\n## 0.0.1\n\nOlder\n')
  commit()
  assert.throws(inspect, /Missing CHANGELOG entry/)
  write('packages/wowds/CHANGELOG.md', '# @sample/wowds\n\n## 0.0.1\n')
  commit()
  assert.throws(inspect, /Missing CHANGELOG entry/)
})

test('release metadata requires changed versions to increase in SemVer precedence', (t) => {
  const repo = mkdtempSync(path.join(os.tmpdir(), 'gdg-release-versions-'))
  t.after(() => rmSync(repo, { recursive: true, force: true }))
  const git = (...args) =>
    execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: 'pipe' }).trim()
  const save = (version) => {
    writeFileSync(
      path.join(repo, 'packages/ui/package.json'),
      JSON.stringify({ name: '@sample/ui', version }),
    )
    writeFileSync(path.join(repo, 'packages/ui/CHANGELOG.md'), `# UI\n\n## ${version}\n\nUpdate\n`)
    git('add', '.')
    git('commit', '--allow-empty', '-qm', 'Version fixture')
    return git('rev-parse', 'HEAD')
  }
  git('init', '-q', '-b', 'main')
  git('config', 'user.name', 'Version Test')
  git('config', 'user.email', 'versions@example.invalid')
  git('config', 'core.hooksPath', '.git/hooks')
  mkdirSync(path.join(repo, 'packages/ui'), { recursive: true })
  for (const [before, after, error] of [
    ['0.2.0', '0.1.0', /Version must increase/],
    ['1.0.0', '0.0.0', /Version must increase/],
    ['1.0.0', '1.0.0-rc.1', /Version must increase/],
    ['1.10.0', '1.9.0', /Version must increase/],
    ['1.0.0+build1', '1.0.0+build2', /Version must increase/],
    ['1.0.0', '1.0.0+build1', /Version must increase/],
    ['1.0.0+build1', '1.0.0', /Version must increase/],
    ['1.0.0-rc.1+build1', '1.0.0-rc.1+build2', /Version must increase/],
    ['0.0.0', '0.1.0', null],
    ['1.9.0', '1.10.0', null],
    ['1.0.0-rc.1', '1.0.0', null],
    ['1.0.0-rc.2', '1.0.0-rc.10', null],
    ['1.0.0', '1.0.0', null],
    ['1.0.0+build1', '1.0.0+build1', null],
    ['1.0.0+build2', '1.0.1+build1', null],
    ['1.0.0', 'invalid', /Invalid package version/],
  ]) {
    const base = save(before)
    const head = save(after)
    const inspect = () =>
      execFileSync(
        process.execPath,
        [fileURLToPath(new URL('./release-pr.mjs', import.meta.url)), base, head],
        { cwd: repo, encoding: 'utf8', stdio: 'pipe' },
      )
    if (error) {
      assert.throws(inspect, error, `${before} → ${after}`)
    } else {
      const result = JSON.parse(inspect())
      assert.equal(result.releases.length, before === after ? 0 : 1)
    }
  }
})
