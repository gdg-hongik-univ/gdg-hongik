import { useEffect, useState } from 'react'
import { getProjectTracks } from '../api/projectTrack'
import type { ProjectTrackSemester } from '../types/projectTrack'

type ProjectTracksState =
  | { status: 'loading' | 'error' }
  | { status: 'success'; items: ProjectTrackSemester[] }

export function useProjectTracks() {
  const [state, setState] = useState<ProjectTracksState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const { items } = await getProjectTracks(controller.signal)
        if (!controller.signal.aborted) setState({ status: 'success', items })
      } catch {
        if (!controller.signal.aborted) setState({ status: 'error' })
      }
    }
    void load()
    return () => controller.abort()
  }, [attempt])

  const retry = () => {
    setState({ status: 'loading' })
    setAttempt((previous) => previous + 1)
  }

  return { state, retry }
}
