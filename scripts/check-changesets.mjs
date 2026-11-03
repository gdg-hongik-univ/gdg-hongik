import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import parse from '@changesets/parse'

const names = new Set()
for (const parent of ['apps', 'packages']) {
  for (const entry of readdirSync(parent, { withFileTypes: true })) {
    const manifest = `${parent}/${entry.name}/package.json`
    if (!entry.isDirectory() || !existsSync(manifest)) continue
    const pkg = JSON.parse(readFileSync(manifest, 'utf8'))
    names.add(pkg.name)
  }
}

const releasing = new Set()
for (const file of readdirSync('.changeset').filter(
  (file) => file.endsWith('.md') && file !== 'README.md',
)) {
  const { releases, summary } = parse(readFileSync(`.changeset/${file}`, 'utf8'))
  if (releases.length && !summary.trim()) throw new Error(`Missing changeset summary: ${file}`)
  for (const { name, type } of releases) {
    if (!names.has(name)) throw new Error(`Unknown workspace package in ${file}: ${name}`)
    if (!['major', 'minor', 'patch'].includes(type)) {
      throw new Error(`Use major, minor or patch in ${file}: ${name}`)
    }
  }
  if (releases.length) releasing.add(`.changeset/${file}`)
}

console.log(`Validated changesets: ${releasing.size} with package releases.`)

// Presence is advisory: only a reviewer can judge whether this change needs a release.
const [base] = process.argv.slice(2)
if (base) {
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
  const ancestor = git('merge-base', base, 'HEAD')
  const changed = git(
    'diff',
    '--name-only',
    '--diff-filter=AM',
    ancestor,
    'HEAD',
    '--',
    '.changeset',
  ).split('\n')
  if (!changed.some((file) => releasing.has(file))) {
    console.log(
      '::warning::No new release changeset in this PR. If a release is unnecessary, explain why in the PR and confirm during review.',
    )
  }
}
