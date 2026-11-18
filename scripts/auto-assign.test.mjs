import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { parse } from 'yaml'

test('assigns the PR author once to each mentioned issue in the base repository', async () => {
  const workflow = parse(
    readFileSync(new URL('../.github/workflows/auto_assign.yml', import.meta.url), 'utf8'),
  )
  const steps = workflow.jobs['assign-author'].steps
  const step = steps.find(({ name }) => name === 'Assign PR author to mentioned issues')
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const assign = new AsyncFunction('github', 'context', 'core', step.with.script)

  const repo = { owner: 'sample', repo: 'project' }
  const repositoryUrl = 'https://github.com/sample/project'
  const issueUrl = (number) => `${repositoryUrl}/issues/${number}`
  const context = {
    repo,
    payload: {
      pull_request: {
        number: 30,
        user: { login: 'author' },
        base: { repo: { html_url: repositoryUrl } },
      },
    },
  }
  const body = `
    <!-- unrelated #2 -->
    <code>#3</code>
    <a class="issue-link" href="${issueUrl(10)}">#10</a>
    <a href="${issueUrl(10)}#issuecomment-42">Duplicate</a>
    <a href="/sample/project/issues/11">#11</a>
    <a href="https://github.com/other/project/issues/12">Other repository</a>
    <a href="${repositoryUrl}/pull/13">Pull request</a>
    <a href="${issueUrl(14)}">Pull request referenced as an issue</a>
    <a href="${issueUrl(15)}">Already assigned</a>
    <a href="${issueUrl(16)}">Transferred issue</a>
    <a href="${issueUrl(17)}">Missing issue</a>
    <a href="${issueUrl(18)}">Assignment rejected</a>
  `
  const lookups = []
  const assignments = []
  const warnings = []
  const github = {
    rest: {
      pulls: {
        get: async (params) => {
          assert.deepEqual(params, {
            ...repo,
            pull_number: 30,
            headers: { accept: 'application/vnd.github.html+json' },
          })
          return { data: { body_html: body } }
        },
      },
      issues: {
        get: async ({ issue_number }) => {
          lookups.push(issue_number)
          if (issue_number === 17) throw Object.assign(new Error('Not found'), { status: 404 })
          const data = { html_url: issueUrl(issue_number), assignees: [{ login: 'existing' }] }
          if (issue_number === 14) data.pull_request = {}
          if (issue_number === 15) data.assignees.push({ login: 'Author' })
          if (issue_number === 16) data.html_url = 'https://github.com/other/project/issues/42'
          return { data }
        },
        addAssignees: async (params) => {
          assignments.push(params)
          const assignees = [{ login: 'existing' }]
          if (params.issue_number !== 18) assignees.push({ login: 'author' })
          return { data: { assignees } }
        },
      },
    },
  }

  await assign(github, context, { warning: (message) => warnings.push(message) })

  assert.ok(workflow.on.pull_request_target.types.includes('edited'))
  assert.deepEqual(lookups, [10, 11, 14, 15, 16, 17, 18])
  assert.deepEqual(
    assignments,
    [10, 11, 18].map((number) => ({ ...repo, issue_number: number, assignees: ['author'] })),
  )
  assert.equal(warnings.length, 1)
  assert.match(warnings[0], /#18/)
})
