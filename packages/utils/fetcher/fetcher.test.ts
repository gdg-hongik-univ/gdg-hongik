import assert from 'node:assert/strict'
import test from 'node:test'
import { createFetcher, HttpError } from './index.ts'

test('combines base paths and headers without changing shared defaults', async (t) => {
  const headers = new Headers({ Authorization: 'Bearer default', Accept: 'application/json' })
  const api = createFetcher({
    baseUrl: 'https://api.example.com/v1/',
    headers,
    credentials: 'include',
  })
  headers.set('Authorization', 'Bearer changed')

  const fetch = t.mock.method(globalThis, 'fetch')
  fetch.mock.mockImplementation(async () => Response.json({ items: [] }))
  const controller = new AbortController()
  assert.deepEqual(
    await api.get('/events?semester=2026-2', {
      headers: [['authorization', 'Bearer request']],
      credentials: 'omit',
      signal: controller.signal,
    }),
    { items: [] },
  )

  const [url, options] = fetch.mock.calls[0].arguments
  assert.ok(options)
  const requestHeaders = new Headers(options.headers)
  assert.equal(url, 'https://api.example.com/v1/events?semester=2026-2')
  assert.equal(options.method, 'GET')
  assert.equal(requestHeaders.get('authorization'), 'Bearer request')
  assert.equal(requestHeaders.get('accept'), 'application/json')
  assert.equal(options.credentials, 'omit')
  assert.equal(options.signal, controller.signal)

  await api.get('studies')
  const defaults = fetch.mock.calls[1].arguments[1]
  assert.ok(defaults)
  assert.equal(new Headers(defaults.headers).get('authorization'), 'Bearer default')
  assert.equal(defaults.credentials, 'include')
})

test('supports deployment base paths, absolute URLs, and clients without a base URL', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch')
  fetch.mock.mockImplementation(async () => Response.json({}))
  const api = createFetcher({ baseUrl: '/landing/' })
  await api.get('events.json')
  await api.get('https://other.example.com/events')
  await api.get('//other.example.com/events')
  await createFetcher().get('/config.json')

  assert.deepEqual(
    fetch.mock.calls.map(({ arguments: [url] }) => url),
    [
      '/landing/events.json',
      'https://other.example.com/events',
      '//other.example.com/events',
      '/config.json',
    ],
  )
})

test('serializes JSON writes and preserves explicit content types', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch')
  fetch.mock.mockImplementation(async () => Response.json({ id: 1 }))
  const api = createFetcher()

  for (const method of ['post', 'put', 'patch'] as const) {
    assert.deepEqual(await api[method]('/applications', { name: '홍길동' }), { id: 1 })
    const options = fetch.mock.calls.at(-1)?.arguments[1]
    assert.ok(options)
    assert.equal(options.method, method.toUpperCase())
    assert.equal(options.body, '{"name":"홍길동"}')
    assert.equal(new Headers(options.headers).get('content-type'), 'application/json')
  }

  await api.post('/applications')
  const emptyOptions = fetch.mock.calls.at(-1)?.arguments[1]
  assert.ok(emptyOptions)
  assert.equal(emptyOptions.body, undefined)
  assert.equal(new Headers(emptyOptions.headers).has('content-type'), false)

  const custom = createFetcher({ headers: { 'Content-Type': 'application/vnd.api+json' } })
  await custom.post('/applications', { name: '홍길동' })
  assert.equal(
    new Headers(fetch.mock.calls.at(-1)?.arguments[1]?.headers).get('content-type'),
    'application/vnd.api+json',
  )
})

test('handles empty responses, text, JSON null, and invalid successful JSON', async (t) => {
  const responses = [
    new Response(null, { status: 204 }),
    new Response(null, { status: 205 }),
    new Response(''),
    new Response('hello'),
    Response.json(null),
    new Response('{"message":"invalid"', { headers: { 'Content-Type': 'application/json' } }),
  ]
  const fetch = t.mock.method(globalThis, 'fetch')
  fetch.mock.mockImplementation(async () => {
    const response = responses.shift()
    assert.ok(response)
    return response
  })
  const api = createFetcher()

  assert.equal(await api.delete('/applications/1'), undefined)
  const options = fetch.mock.calls[0].arguments[1]
  assert.ok(options)
  assert.equal(options.method, 'DELETE')
  assert.equal(options.body, undefined)
  assert.equal(await api.get('/reset'), undefined)
  assert.equal(await api.get('/empty'), undefined)
  assert.equal(await api.get('/text'), 'hello')
  assert.equal(await api.get('/null'), null)
  await assert.rejects(api.get('/invalid'), SyntaxError)
})

test('HTTP errors retain their status, response, and JSON or text body', async (t) => {
  const responses = [
    Response.json({ code: 'UNAUTHORIZED' }, { status: 401 }),
    new Response('Bad Gateway', { status: 502 }),
    new Response('{invalid', { status: 500, headers: { 'Content-Type': 'application/json' } }),
    new Response(null, { status: 404 }),
  ]
  const fetch = t.mock.method(globalThis, 'fetch')
  fetch.mock.mockImplementation(async () => {
    const response = responses.shift()
    assert.ok(response)
    return response
  })
  const api = createFetcher()

  for (const [status, data] of [
    [401, { code: 'UNAUTHORIZED' }],
    [502, 'Bad Gateway'],
    [500, '{invalid'],
    [404, undefined],
  ] as const) {
    const response = responses[0]
    await assert.rejects(api.get('/events'), (error: unknown) => {
      assert.ok(error instanceof HttpError)
      assert.equal(error.name, 'HttpError')
      assert.equal(error.status, status)
      assert.deepEqual(error.data, data)
      assert.equal(error.response, response)
      return true
    })
  }
})

test('raw requests pass through native bodies without setting JSON headers', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch')
  fetch.mock.mockImplementation(async () => Response.json({ uploaded: true }))
  const body = new FormData()
  body.set('name', '홍길동')
  const api = createFetcher()
  assert.deepEqual(await api.request('/upload', { method: 'POST', body }), { uploaded: true })

  const options = fetch.mock.calls[0].arguments[1]
  assert.ok(options)
  assert.equal(options.body, body)
  assert.equal(new Headers(options.headers).has('content-type'), false)
})

test('propagates cancellation and network errors to callers', async (t) => {
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(
    createFetcher().get('data:application/json,{}', { signal: controller.signal }),
    { name: 'AbortError' },
  )

  const error = new TypeError('Failed to fetch')
  t.mock.method(globalThis, 'fetch', async () => {
    throw error
  })
  await assert.rejects(createFetcher().get('/events'), (actual) => actual === error)
})
