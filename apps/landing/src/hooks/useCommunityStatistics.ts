import { useQuery } from '@tanstack/react-query'
import { getCommunityStatistics } from '../api/communityStatistics'

export const COMMUNITY_STATISTICS_QUERY_KEY = ['community', 'statistics'] as const

export function useCommunityStatistics() {
  return useQuery({
    queryKey: COMMUNITY_STATISTICS_QUERY_KEY,
    queryFn: ({ signal }) => getCommunityStatistics(signal),
    staleTime: 5 * 60 * 1000,
  })
}
