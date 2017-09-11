import {
  parse,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  format
} from 'date-fns'

export const getTimeDifference = (c, i18n) => {

  const timestamp = parse(c)
  const now = new Date()

  const formatDiff = (fn, unit) => i18n.t(`time.${unit}`, {count: fn(now, timestamp)})

  if (differenceInMonths(now, timestamp) > 0)
    return format(timestamp, 'DD MMMM YYYY')
  if (differenceInWeeks(now, timestamp) > 0)
    return formatDiff(differenceInWeeks, 'week')
  if (differenceInDays(now, timestamp) > 0)
    return formatDiff(differenceInDays, 'day')
  if (differenceInHours(now, timestamp) > 0)
    return formatDiff(differenceInHours, 'hour')
  if (differenceInMilliseconds(now, timestamp) > 0)
    return i18n.t('time.aMomentAgo')

}
