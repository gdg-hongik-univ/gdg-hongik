import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

test('an explicit release SHA recovers older tags and notes after a newer release and a normal commit', async (t) => {
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
  await t.test(
    'the manual workflow forwards the selected SHA through validation, tags and GitHub Releases',
    async () => {
      const workflow = parse(
        readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8'),
      )
      const steps = workflow.jobs['tag-packages'].steps
      const resolve = steps.find((step) => step.id === 'release')
      const verify = steps.find((step) => step.name === 'Verify prepared main merge commit')
      const tag = steps.find((step) => step.name === 'Tag released package versions on main')
      const publish = steps.find(
        (step) => step.name === 'Publish GitHub Releases from package changelogs',
      )
      const bin = path.join(fixture, 'bin')
      const output = path.join(fixture, 'outputs')
      const commands = path.join(fixture, 'commands')
      mkdirSync(bin)
      symlinkSync(fileURLToPath(new URL('./', import.meta.url)), path.join(repo, 'scripts'), 'dir')
      writeFileSync(commands, '')
      // Run the real scripts without starting pnpm's package-manager download in each fixture.
      writeFileSync(
        path.join(bin, 'pnpm'),
        `#!/usr/bin/env node
const { execFileSync } = require('node:child_process')
const { appendFileSync } = require('node:fs')
const scripts = ${JSON.stringify({
          'release:check': fileURLToPath(new URL('./release-pr.mjs', import.meta.url)),
          'tag-packages': fileURLToPath(new URL('./tag-packages.mjs', import.meta.url)),
        })}
const script = scripts[process.argv[2]]
if (!script) throw new Error('Unexpected pnpm command: ' + process.argv[2])
appendFileSync(process.env.WORKFLOW_TEST_LOG, JSON.stringify(process.argv.slice(2)) + '\\n')
execFileSync(process.execPath, [script, ...process.argv.slice(3)], { stdio: 'inherit' })
`,
        { mode: 0o755 },
      )
      let releaseSha
      const environment = (
        step,
        event = 'workflow_dispatch',
        requested = older,
        githubSha = latest,
      ) => {
        const expressions = {
          '${{ inputs.release_sha }}': requested,
          '${{ steps.release.outputs.sha }}': releaseSha,
        }
        const env = {
          ...process.env,
          PATH: `${bin}${path.delimiter}${process.env.PATH}`,
          GITHUB_EVENT_NAME: event,
          GITHUB_SHA: githubSha,
          GITHUB_OUTPUT: output,
          WORKFLOW_TEST_LOG: commands,
          RELEASE_SHA: '',
        }
        for (const [name, value] of Object.entries(step.env ?? {})) {
          if (value.startsWith('${{')) {
            assert.ok(
              Object.hasOwn(expressions, value),
              `Unsupported workflow expression: ${value}`,
            )
            assert.notEqual(expressions[value], undefined)
            env[name] = expressions[value]
          } else {
            env[name] = value
          }
        }
        return env
      }
      const shell = (step, env = environment(step)) =>
        execFileSync('bash', ['-e', '-o', 'pipefail', '-c', step.run], {
          cwd: repo,
          env,
          encoding: 'utf8',
          stdio: 'pipe',
        })
      const resolveSha = (event, requested, githubSha) => {
        writeFileSync(output, '')
        shell(resolve, environment(resolve, event, requested, githubSha))
        return Object.fromEntries(
          readFileSync(output, 'utf8')
            .trim()
            .split('\n')
            .map((line) => line.split('=')),
        ).sha
      }
      assert.equal(resolveSha('push', older, newer), newer)
      assert.throws(
        () => resolveSha('workflow_dispatch', '', latest),
        /40-character release commit SHA/,
      )
      assert.throws(() => resolveSha('workflow_dispatch', prepared, latest), /first-parent history/)
      releaseSha = resolveSha('workflow_dispatch', older, latest)
      assert.equal(releaseSha, older)
      shell(verify)
      shell(tag)
      assert.deepEqual(
        readFileSync(commands, 'utf8')
          .trim()
          .split('\n')
          .map((line) => JSON.parse(line)),
        [
          ['release:check', `${older}^`, older],
          ['tag-packages', older],
        ],
      )
      assert.equal(git('rev-parse', '@sample/ui@0.1.0^{}'), older)

      const releases = new Map()
      let created = 0
      const github = {
        rest: {
          repos: {
            getReleaseByTag: async ({ tag }) => {
              if (!releases.has(tag)) throw Object.assign(new Error('Not found'), { status: 404 })
              return { data: releases.get(tag) }
            },
            createRelease: async (data) => {
              created++
              releases.set(data.tag_name, data)
              return { data: { html_url: 'https://example.invalid/release' } }
            },
          },
        },
      }
      const summary = {
        addLink() {
          return this
        },
        addBreak() {
          return this
        },
        async write() {},
      }
      const env = environment(publish)
      const requireForWorkflow = (name) => {
        assert.equal(name, 'node:child_process')
        return {
          execFileSync: (command, args, options) =>
            execFileSync(command, args, { ...options, cwd: repo, env }),
        }
      }
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
      const publishRelease = new AsyncFunction(
        'github',
        'context',
        'core',
        'require',
        'process',
        publish.with.script,
      )
      for (let retry = 0; retry < 2; retry++) {
        await publishRelease(
          github,
          { repo: { owner: 'fixture', repo: 'fixture' } },
          { info() {}, summary },
          requireForWorkflow,
          { env },
        )
      }
      assert.equal(created, 1)
      assert.deepEqual([...releases.keys()], ['@sample/ui@0.1.0'])
      assert.equal(releases.get('@sample/ui@0.1.0').body, 'Release 0.1.0')
    },
  )
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
