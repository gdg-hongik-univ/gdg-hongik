const DAY_IN_MS = 1000 * 60 * 60 * 24

export const parseEventDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const formatMonthDay = (date: string) => {
  const [, month, day] = date.split('-')
  return `${month}.${day}`
}

export const getDaysUntil = (eventDate: Date, today: Date) =>
  Math.round((eventDate.getTime() - today.getTime()) / DAY_IN_MS)

export const formatCountdown = (daysUntil: number) => (daysUntil === 0 ? 'D-Day' : `D-${daysUntil}`)

export const getStartOfToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}
