import { addMonths, differenceInDays, format, isAfter, isBefore, parseISO } from 'date-fns'

import { getCurrentYear } from 'utils/dates/getCurrentYear'
import { getLocale } from 'utils/dates/getLocale'
import { getRelativeDate } from 'utils/dates/getRelativeDate'

export const Dates = {
  addMonths,
  differenceInDays,
  format,
  getCurrentYear,
  getLocale,
  getRelativeDate,
  isAfter,
  isBefore,
  parseISO,
}
