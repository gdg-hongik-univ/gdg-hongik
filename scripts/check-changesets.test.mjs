import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

test('validates package names, bump types, summaries and empty changesets', (t) => {
  const repo = mkdtempSync(path.join(os.tmpdir(), 'gdg-changesets-'))
  t.after(() => rmSync(repo, { recursive: true, force: true }))
  for (const dir of ['apps/landing', 'packages/wowds', 'packages/empty-directory', '.changeset']) {
    mkdirSync(path.join(repo, dir), { recursive: true })
  }
  for (const [dir, name] of [
    ['apps/landing', '@gdg/landing'],
    ['packages/wowds', '@gdg/wowds'],
  ]) {
    writeFileSync(path.join(repo, dir, 'package.json'), JSON.stringify({ name, version: '0.0.0' }))
  }
  const change = path.join(repo, '.changeset/feature.md')
  const inspect = () =>
    execFileSync(
      process.execPath,
      [fileURLToPath(new URL('./check-changesets.mjs', import.meta.url))],
      { cwd: repo, encoding: 'utf8', stdio: 'pipe' },
    )
  writeFileSync(path.join(repo, '.changeset/README.md'), '# Instructions')
  writeFileSync(change, '---\n"@gdg/landing": patch\n"@gdg/wowds": minor\n---\n변경 설명\n')
  assert.match(inspect(), /Validated changesets: 1/)
  writeFileSync(change, '---\n---\n')
  assert.match(inspect(), /Validated changesets: 0/)
  for (const [contents, error] of [
    ['---\n"@unknown/pkg": patch\n---\nFix\n', /Unknown workspace package/],
    ['---\n"@gdg/landing": patch\n---\n', /Missing changeset summary/],
    ['---\n"@gdg/landing": huge\n---\nFix\n', /invalid version type/],
    ['---\n"@gdg/landing": none\n---\nFix\n', /Use major, minor or patch/],
    ['Not a changeset', /missing or invalid frontmatter/],
  ]) {
    writeFileSync(change, contents)
    assert.throws(inspect, error)
  }
})

test('advises on missing changesets in this PR even when develop already has pending releases', (t) => {
  const repo = mkdtempSync(path.join(os.tmpdir(), 'gdg-changeset-pr-'))
  t.after(() => rmSync(repo, { recursive: true, force: true }))
  const git = (...args) =>
    execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: 'pipe' }).trim()
  const commit = () => {
    git('add', '.')
    git('commit', '-qm', 'Fixture')
  }
  for (const dir of ['apps/landing', 'packages', '.changeset'])
    mkdirSync(path.join(repo, dir), { recursive: true })
  writeFileSync(
    path.join(repo, 'apps/landing/package.json'),
    JSON.stringify({ name: '@gdg/landing' }),
  )
  const contents = '---\n"@gdg/landing": patch\n---\nFix\n'
  writeFileSync(path.join(repo, '.changeset/existing.md'), contents)
  git('init', '-q', '-b', 'develop')
  git('config', 'user.name', 'Changeset Test')
  git('config', 'user.email', 'changeset@example.invalid')
  git('config', 'core.hooksPath', '.git/hooks')
  commit()
  git('checkout', '-qb', 'feature')
  writeFileSync(path.join(repo, 'README.md'), 'Documentation only\n')
  commit()
  const inspect = () =>
    execFileSync(
      process.execPath,
      [fileURLToPath(new URL('./check-changesets.mjs', import.meta.url)), 'develop'],
      { cwd: repo, encoding: 'utf8', stdio: 'pipe' },
    )
  assert.match(inspect(), /::warning::No new release changeset/)
  writeFileSync(path.join(repo, '.changeset/empty.md'), '---\n---\n')
  commit()
  assert.match(inspect(), /::warning::No new release changeset/)
  writeFileSync(path.join(repo, '.changeset/feature.md'), contents)
  commit()
  assert.doesNotMatch(inspect(), /::warning::/)
})
