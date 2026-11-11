import { createFetcher } from '@gdg/utils'

export const serverApi = createFetcher({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})
