import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

test('an explicit release SHA recovers older tags and notes after a newer release and a normal commit', (t) => {
  const fixture = mkdtempSync(path.join(os.tmpdir(), 'gdg-release-recovery-'))
  t.after(() => rmSync(fixture, { recursive: true, force: true }))
  const repo = path.join(fixture, 'repo')
  mkdirSync(repo)
  const git = (...args) =>
    execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: 'pipe' }).trim()
  const run = (script, ...args) =>
    execFileSync(process.execPath, [fileURLToPath(new URL(script, import.meta.url)), ...args], {
      cwd: repo,
      encoding: 'utf8',
      stdio: 'pipe',
    })
  const commit = () => {
    git('add', '.')
    git('commit', '-qm', 'Recovery fixture')
    return git('rev-parse', 'HEAD')
  }
  const pkg = (version) =>
    writeFileSync(
      path.join(repo, 'packages/ui/package.json'),
      JSON.stringify({ name: '@sample/ui', version }),
    )
  git('init', '-q', '-b', 'main')
  git('config', 'user.name', 'Recovery Test')
  git('config', 'user.email', 'recovery@example.invalid')
  git('config', 'core.hooksPath', '.git/hooks')
  git('init', '--bare', '-q', path.join(fixture, 'remote.git'))
  git('remote', 'add', 'origin', path.join(fixture, 'remote.git'))
  mkdirSync(path.join(repo, 'packages/ui'), { recursive: true })
  pkg('0.0.0')
  commit()
  git('checkout', '-qb', 'develop')
  const notes = (version) => `# UI\n\n## ${version}\n\nRelease ${version}\n`
  const prepare = (version) => {
    git('checkout', '-q', 'develop')
    pkg(version)
    writeFileSync(path.join(repo, 'packages/ui/CHANGELOG.md'), notes(version))
    return commit()
  }
  const merge = () => {
    git('checkout', '-q', 'main')
    git('merge', '--no-ff', '--no-edit', 'develop')
    return git('rev-parse', 'HEAD')
  }
  const prepared = prepare('0.1.0')
  const older = merge()
  prepare('0.2.0')
  const newer = merge()
  writeFileSync(path.join(repo, 'README.md'), 'Later main documentation commit\n')
  const latest = commit()

  run('./tag-packages.mjs', newer)
  assert.deepEqual(git('tag', '--list').split('\n'), ['@sample/ui@0.2.0'])
  const newerTag = git('rev-parse', 'refs/tags/@sample/ui@0.2.0')
  run('./release-pr.mjs', `${older}^`, older)
  run('./tag-packages.mjs', older)
  assert.equal(git('rev-parse', '@sample/ui@0.1.0^{}'), older)
  assert.equal(git('rev-parse', 'refs/tags/@sample/ui@0.2.0'), newerTag)
  assert.ok(git('ls-remote', '--tags', 'origin').includes('@sample/ui@0.1.0'))
  const expected = [{ tag: '@sample/ui@0.1.0', body: 'Release 0.1.0' }]
  assert.deepEqual(JSON.parse(run('./release-notes.mjs', older)), expected)
  run('./tag-packages.mjs', older)
  assert.deepEqual(JSON.parse(run('./release-notes.mjs', older)), expected)
  assert.equal(git('rev-parse', 'HEAD'), latest)
  assert.equal(JSON.parse(run('./release-notes.mjs'))[0].tag, '@sample/ui@0.2.0')

  for (const script of ['./tag-packages.mjs', './release-notes.mjs']) {
    assert.throws(() => run(script, ''), /40-character release commit SHA/)
    assert.throws(() => run(script, older.slice(0, 7)), /40-character release commit SHA/)
    assert.throws(() => run(script, '0'.repeat(40)))
    assert.throws(() => run(script, prepared), /first-parent history/)
  }
})
