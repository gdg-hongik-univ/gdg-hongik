import { QueryCache, QueryClient } from '@tanstack/react-query'

function isCancellationError(error: unknown) {
  return error instanceof Error && (error.name === 'AbortError' || error.name === 'CancelledError')
}

export function createQueryClient() {
  const queryCache = new QueryCache({
    onError(error, query) {
      if (isCancellationError(error)) return

      console.error('데이터 조회에 실패했습니다.', query.queryKey, error)
    },
  })

  return new QueryClient({ queryCache })
}
