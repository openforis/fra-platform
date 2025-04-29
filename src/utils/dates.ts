import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInWeeks,
  format,
  getYear,
  isAfter,
  isBefore,
  Locale,
  parseISO,
} from 'date-fns'
import { ar, enUS, es, fr, ru, zhCN } from 'date-fns/locale'

import { Lang } from 'meta/lang'

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

const getCurrentYear = (): number => getYear(new Date())

const localeMap: Record<Lang, Locale> = {
  [Lang.en]: enUS,
  [Lang.es]: es,
  [Lang.fr]: fr,
  [Lang.ru]: ru,
  [Lang.ar]: ar,
  [Lang.zh]: zhCN,
}

const getLocale = (languageCode: Lang): Locale => localeMap[languageCode] || enUS

export const Dates = {
  addDays,
  addMonths,
  differenceInDays,
  format,
  getCurrentYear,
  getRelativeDate,
  isAfter,
  isBefore,
  parseISO,
  getLocale,
}
