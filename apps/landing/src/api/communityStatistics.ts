import { serverApi } from './serverClient'
import { isCommunityStatistics, type CommunityStatistics } from './communityStatisticsSchema'

export async function getCommunityStatistics(signal?: AbortSignal): Promise<CommunityStatistics> {
  const data = await serverApi.get<unknown>('/community-statistics', { signal })

  if (!isCommunityStatistics(data)) {
    throw new Error('커뮤니티 통계 응답 형식이 올바르지 않습니다.')
  }

  return data
}
