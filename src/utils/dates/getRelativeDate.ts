import { differenceInDays, differenceInHours, differenceInMonths, differenceInWeeks, format, parseISO } from 'date-fns'
import { i18n as I18n } from 'i18next'

import { Objects } from 'utils/objects'

export const getRelativeDate = (rawDate: number | string | null, i18n: Pick<I18n, 't'>): string | null => {
  if (Objects.isNil(rawDate)) {
    return null
  }
  const timestamp = parseISO(rawDate?.toString())
  const now = new Date()

  const formatDiff = (fn: typeof differenceInWeeks, unit: string): string =>
    i18n.t(`time.${unit}`, { count: fn(now, timestamp) })

  if (differenceInMonths(now, timestamp) > 0) return format(timestamp, 'dd MMMM yyyy')
  if (differenceInWeeks(now, timestamp) > 0) return formatDiff(differenceInWeeks, 'week')
  if (differenceInDays(now, timestamp) > 0) return formatDiff(differenceInDays, 'day')
  if (differenceInHours(now, timestamp) > 0) return formatDiff(differenceInHours, 'hour')

  return i18n.t('time.aMomentAgo')
}
