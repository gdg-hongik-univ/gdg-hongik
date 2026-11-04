import { execFileSync } from 'node:child_process'
import parse from '@changesets/parse'
import semver from 'semver'

const [base, head] = process.argv.slice(2)
if (!base || !head) throw new Error('Usage: node scripts/release-pr.mjs <base-ref> <head-ref>')
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const files = (ref) => git('ls-tree', '-r', '--name-only', ref).split('\n')
const read = (ref, file) => git('show', `${ref}:${file}`)
const headFiles = files(head)
const isPackageManifest = (file) => /^(apps|packages)\/[^/]+\/package\.json$/.test(file)
const basePackages = new Map(
  files(base)
    .filter(isPackageManifest)
    .map((file) => {
      const pkg = JSON.parse(read(base, file))
      return [pkg.name, pkg]
    }),
)

for (const file of headFiles.filter((file) =>
  /^\.changeset\/(?!README\.md$)[^/]+\.md$/.test(file),
)) {
  if (parse(read(head, file)).releases.length) {
    throw new Error(`Unreleased changeset: ${file}. Merge the version PR into develop first.`)
  }
}

const releases = []
for (const file of headFiles.filter(isPackageManifest)) {
  const pkg = JSON.parse(read(head, file))
  const previous = basePackages.get(pkg.name)
  if (!semver.valid(pkg.version) || (previous && !semver.valid(previous.version))) {
    throw new Error(`Invalid package version: ${pkg.name}`)
  }
  if (previous && pkg.version !== previous.version && semver.lte(pkg.version, previous.version)) {
    throw new Error(`Version must increase: ${pkg.name} ${previous.version} → ${pkg.version}`)
  }
  if (pkg.version === previous?.version || pkg.version === '0.0.0') continue

  const changelog = file.replace(/package\.json$/, 'CHANGELOG.md')
  const contents = headFiles.includes(changelog) ? read(head, changelog) : ''
  const entry = contents
    .split(/^## /m)
    .find((section) => section.split('\n')[0].trim() === pkg.version)
  if (!entry?.split('\n').slice(1).join('\n').trim()) {
    throw new Error(
      `Missing CHANGELOG entry for ${pkg.name}@${pkg.version}. Prepare a version PR first.`,
    )
  }
  releases.push({ name: pkg.name, oldVersion: previous?.version ?? null, version: pkg.version })
}
releases.sort((a, b) => a.name.localeCompare(b.name))
const title = releases.length
  ? `release: ${releases.map((pkg) => `${pkg.name}@${pkg.version}`).join(', ')}`
  : 'chore: sync develop to main'

console.log(JSON.stringify({ title, releases }))
