/** 요청 실패 또는 취소 시 null을 반환하고, 취소 이외의 오류만 기록합니다. */
export async function fetcher<T>(
  url: string,
  errorMessage: string,
  signal?: AbortSignal,
  transform?: (data: T, responseUrl: string) => T,
): Promise<T | null> {
  try {
    const response = await fetch(url, { signal })

    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`)
    }

    const data: T = await response.json()
    if (signal?.aborted) return null
    return transform ? transform(data, response.url) : data
  } catch (error) {
    if (!signal?.aborted) console.error(errorMessage, error)
    return null
  }
}
