import { isEmpty } from './isEmpty'
import { setInPath } from './setInPath'

const _traverseAndCompare = <T extends Record<string, unknown>>(
  a: unknown,
  b: unknown,
  path: Array<string> = [],
  keysToIgnore: Array<string> = [],
  diff: Partial<T> = {}
): Partial<T> => {
  const notObject = typeof a !== 'object' || typeof b !== 'object'
  const isNull = a === null || b === null
  const isNotObjectOrNull = notObject || isNull

  if (isNotObjectOrNull) {
    const lastPathElement = path.at(-1)
    const isDifferentAndNotIgnored = a !== b && !keysToIgnore.includes(lastPathElement)

    if (isDifferentAndNotIgnored) {
      setInPath({ obj: diff, path, value: b })
    }

    return diff
  }

  const keys = Object.keys(a as object)

  keys.forEach((key) => {
    if (keysToIgnore.includes(key)) return

    const _a = (a as Record<string, unknown>)[key]
    const _b = (b as Record<string, unknown>)[key]
    const _path = [...path, key]
    _traverseAndCompare(_a, _b, _path, keysToIgnore, diff)
  })

  return diff
}

/**
 * Compares two objects and returns a partial object representing the differences.
 *
 * @template T - The type of the objects, which should extend Record<string, unknown>
 * @param {T} baseObject - The original object to compare from
 * @param {T} compareObject - The object to compare against
 * @param {Array<string> | undefined} keysToIgnore - An optional array of keys to ignore during comparison
 * @returns {Partial<T> | undefined} The partial object representing the differences, or undefined if there are no differences
 *
 * @example
 * const base = { a: 1, b: { c: 2 } };
 * const compare = { a: 1, b: { c: 3, d: 4 } };
 * const result = getDiffAsPartialObject(base, compare);
 * // result: { b: { c: 3, d: 4 } }
 */
export const getDiffAsPartialObject = <T extends Record<string, unknown>>(
  baseObject: T,
  compareObject: T,
  keysToIgnore?: Array<string>
): Partial<T> | undefined => {
  const diff = _traverseAndCompare<T>(baseObject, compareObject, [], keysToIgnore)
  return isEmpty(diff) ? undefined : (diff as Partial<T>)
}
