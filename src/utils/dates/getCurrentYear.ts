import { getYear } from 'date-fns'

export const getCurrentYear = (): number => {
  return getYear(new Date())
}
