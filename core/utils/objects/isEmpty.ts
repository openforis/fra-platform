/**
 * Determines if the specified value is null, empty string, NaN, empty object or empty array.
 *
 * @param {any} value - Value to
 * @returns {boolean} True if the specified value is empty, false otherwise.
 */
export const isEmpty = (value: any): boolean =>
  value === undefined ||
  value === null ||
  value === '' ||
  Number.isNaN(value) ||
  (value instanceof Object && Object.entries(value).length === 0) ||
  (Array.isArray(value) && value.length === 0)
