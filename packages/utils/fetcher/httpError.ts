export class HttpError extends Error {
  readonly status: number
  readonly data: unknown
  readonly response: Response

  constructor(response: Response, data: unknown) {
    super(`HTTP ${response.status} ${response.statusText}`.trimEnd())
    this.name = 'HttpError'
    this.status = response.status
    this.data = data
    this.response = response
  }
}
