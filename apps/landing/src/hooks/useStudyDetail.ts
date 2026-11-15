import { useEffect, useState } from 'react'
import { getStudyDetail } from '../api/studyDetail'
import type { StudySemester } from '../types/study'

type StudyDetailState =
  | { status: 'loading' | 'error' }
  | { status: 'success'; items: StudySemester[] }

export function useStudyDetail() {
  const [state, setState] = useState<StudyDetailState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const { items } = await getStudyDetail(controller.signal)
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
