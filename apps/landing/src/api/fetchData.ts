export async function fetchData<T>(url: string, errorMessage: string, signal?: AbortSignal) {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`${errorMessage} (${response.status})`)
  }

  const data: T = await response.json()
  return { data, url: response.url }
}
