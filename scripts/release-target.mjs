import { execFileSync } from 'node:child_process'

export function resolveReleaseTarget(requestedSha) {
  if (requestedSha !== undefined && !/^[a-f0-9]{40}$/i.test(requestedSha)) {
    throw new Error('Specify a full 40-character release commit SHA.')
  }
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
  const sha = git('rev-parse', '--verify', `${requestedSha?.toLowerCase() ?? 'HEAD'}^{commit}`)
  if (!git('rev-list', '--first-parent', 'HEAD').split('\n').includes(sha)) {
    throw new Error(`Release commit is not on the checked-out main first-parent history: ${sha}`)
  }
  return sha
}
