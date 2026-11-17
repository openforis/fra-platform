import { isNil } from 'utils/objects/isNil'

/**
 * Determines if the specified value is null, empty string, NaN, invalid Date, empty Set or Map, empty object or empty array.
 *
 * @param {any} value - Value to
 * @returns {boolean} True if the specified value is empty, false otherwise.
 */
export const isEmpty = <T>(value: T): boolean => {
  if (isNil(value)) return true

  if (value instanceof Date) return Number.isNaN(value.getTime())

  if (typeof value === 'number') return Number.isNaN(value)

  if (typeof value === 'string') return value.trim().length === 0

  if (value instanceof Set || value instanceof Map) return value.size === 0

  if (typeof value === 'object') return Object.keys(value).length === 0

  return false
}
