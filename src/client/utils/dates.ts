import { differenceInDays, differenceInHours, differenceInMonths, differenceInWeeks, format, parseISO } from 'date-fns'
import { i18n } from 'i18next'
import { Objects } from 'utils/objects'

const getRelativeDate = (rawDate: string, i18n: i18n) => {
  const timestamp = parseISO(rawDate)
  const now = new Date()
  const formatDiff = (fn: any, unit: any) => i18n.t(`time.${unit}`, { count: fn(now, timestamp) })

  if (Objects.isNil(rawDate)) return null
  if (differenceInMonths(now, timestamp) > 0) return format(timestamp, 'dd MMMM yyyy')
  if (differenceInWeeks(now, timestamp) > 0) return formatDiff(differenceInWeeks, 'week')
  if (differenceInDays(now, timestamp) > 0) return formatDiff(differenceInDays, 'day')
  if (differenceInHours(now, timestamp) > 0) return formatDiff(differenceInHours, 'hour')

  return i18n.t('time.aMomentAgo')
}

export const Dates = {
  getRelativeDate,
}
