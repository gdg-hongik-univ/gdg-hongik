import { execFileSync } from 'node:child_process'

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
const manifests = git('ls-tree', '-r', '--name-only', 'HEAD')
  .split('\n')
  .filter((file) => /^(apps|packages)\/[^/]+\/package\.json$/.test(file))
const existingTags = new Set(git('tag', '--list').split('\n'))
const tags = []

for (const manifest of manifests) {
  const pkg = JSON.parse(git('show', `HEAD:${manifest}`))
  if (pkg.version === '0.0.0') continue

  const tag = `${pkg.name}@${pkg.version}`
  if (!existingTags.has(tag)) {
    const commits = git('log', '--first-parent', '--format=%H', '--diff-filter=AM', '--', manifest)
      .split('\n')
      .filter(Boolean)
    const releaseCommit = commits.find((commit) => {
      if (git('rev-list', '--parents', '-n', '1', commit).split(' ').length < 2) return false
      const current = JSON.parse(git('show', `${commit}:${manifest}`))
      const existed = git('ls-tree', '--name-only', `${commit}^`, '--', manifest)
      const previous = existed ? JSON.parse(git('show', `${commit}^:${manifest}`)) : undefined
      return current.version === pkg.version && previous?.version !== pkg.version
    })
    if (!releaseCommit) continue

    git('tag', '--annotate', '--message', tag, tag, releaseCommit)
    console.log(`Created ${tag} at ${releaseCommit}`)
  }
  tags.push(`refs/tags/${tag}`)
}

if (tags.length > 0) {
  // Push only this release's tags; retrying also recovers a previous failed push.
  execFileSync('git', ['push', '--atomic', 'origin', ...tags], { stdio: 'inherit' })
} else {
  console.log('No released package versions to tag.')
}
