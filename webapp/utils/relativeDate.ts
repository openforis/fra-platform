// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import { parseISO, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, format } from 'date-fns'

export const getRelativeDate = (rawDate: any, i18n: any) => {
  const timestamp = parseISO(rawDate)
  const now = new Date()
  const formatDiff = (fn: any, unit: any) => i18n.t(`time.${unit}`, { count: fn(now, timestamp) })

  if (R.isNil(rawDate)) return null
  if (differenceInMonths(now, timestamp) > 0) return format(timestamp, 'dd MMMM yyyy')
  if (differenceInWeeks(now, timestamp) > 0) return formatDiff(differenceInWeeks, 'week')
  if (differenceInDays(now, timestamp) > 0) return formatDiff(differenceInDays, 'day')
  if (differenceInHours(now, timestamp) > 0) return formatDiff(differenceInHours, 'hour')

  return i18n.t('time.aMomentAgo')
}
