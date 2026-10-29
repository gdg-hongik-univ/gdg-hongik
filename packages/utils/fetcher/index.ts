import { HttpError } from './httpError.ts'

export { HttpError }

type RequestOptions = Omit<RequestInit, 'method' | 'body'>

export type FetcherOptions = RequestOptions & {
  baseUrl?: string
}

export function createFetcher({ baseUrl = '', ...defaults }: FetcherOptions = {}) {
  const defaultHeaders = new Headers(defaults.headers)

  function mergeHeaders(headers?: HeadersInit) {
    const merged = new Headers(defaultHeaders)
    new Headers(headers).forEach((value, key) => merged.set(key, value))
    return merged
  }

  /** 빈 응답은 undefined를 반환하고, HTTP 오류는 HttpError로 전달합니다. */
  async function request<T = unknown>(
    url: string,
    options: RequestInit = {},
  ): Promise<T | undefined> {
    const fullUrl =
      baseUrl && !/^[a-z][a-z\d+.-]*:/i.test(url) && !url.startsWith('//')
        ? `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
        : url

    const response = await fetch(fullUrl, {
      ...defaults,
      ...options,
      headers: mergeHeaders(options.headers),
    })

    const text = await response.text()
    let data: unknown = text || undefined

    if (text && response.headers.get('content-type')?.includes('json')) {
      try {
        data = JSON.parse(text)
      } catch (error) {
        if (response.ok) throw error
      }
    }

    if (!response.ok) throw new HttpError(response, data)
    return data as T | undefined
  }

  function jsonRequest<T>(method: string, url: string, body: unknown, options: RequestOptions) {
    const headers = mergeHeaders(options.headers)
    if (body !== undefined && !headers.has('content-type')) {
      headers.set('content-type', 'application/json')
    }

    return request<T>(url, {
      ...options,
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  }

  return {
    request,
    get: <T = unknown>(url: string, options: RequestOptions = {}) =>
      request<T>(url, { ...options, method: 'GET' }),
    post: <T = unknown>(url: string, body?: unknown, options: RequestOptions = {}) =>
      jsonRequest<T>('POST', url, body, options),
    put: <T = unknown>(url: string, body?: unknown, options: RequestOptions = {}) =>
      jsonRequest<T>('PUT', url, body, options),
    patch: <T = unknown>(url: string, body?: unknown, options: RequestOptions = {}) =>
      jsonRequest<T>('PATCH', url, body, options),
    delete: <T = unknown>(url: string, options: RequestOptions = {}) =>
      request<T>(url, { ...options, method: 'DELETE' }),
  }
}
