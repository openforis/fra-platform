import {
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInWeeks,
  format,
  isAfter,
  isBefore,
  parseISO,
} from 'date-fns'

export const getRelativeDate = (rawDate: any, i18n: any) => {
  const timestamp = parseISO(rawDate)
  const now = new Date()
  const formatDiff = (fn: any, unit: any) => i18n.t(`time.${unit}`, { count: fn(now, timestamp) })

  if (rawDate === undefined || rawDate === null) return null
  if (differenceInMonths(now, timestamp) > 0) return format(timestamp, 'dd MMMM yyyy')
  if (differenceInWeeks(now, timestamp) > 0) return formatDiff(differenceInWeeks, 'week')
  if (differenceInDays(now, timestamp) > 0) return formatDiff(differenceInDays, 'day')
  if (differenceInHours(now, timestamp) > 0) return formatDiff(differenceInHours, 'hour')

  return i18n.t('time.aMomentAgo')
}

export const Dates = {
  addMonths,
  isAfter,
  isBefore,
  format,
  getRelativeDate,
  parseISO,
}
