import { isNil } from 'utils/objects/isNil'

/**
 * Determines if the specified value is null, empty string, NaN, empty object or empty array.
 *
 * @param {any} value - Value to
 * @returns {boolean} True if the specified value is empty, false otherwise.
 */
export const isEmpty = (value: any): boolean =>
  isNil(value) ||
  Number.isNaN(value) ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)
