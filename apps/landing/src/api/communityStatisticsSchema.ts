export interface CommunityStatistics {
  totalMemberCount: number
  totalProjectCount: number
  totalSeminarCount: number
}

export function isCommunityStatistics(data: unknown): data is CommunityStatistics {
  if (typeof data !== 'object' || data === null) return false

  const statistics = data as Record<string, unknown>
  return ['totalMemberCount', 'totalProjectCount', 'totalSeminarCount'].every((key) => {
    const value = statistics[key]
    return typeof value === 'number' && Number.isInteger(value) && value >= 0
  })
}
