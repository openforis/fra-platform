/**
 * Merges a partial object or array into a base object or array, recursively handling nested structures.
 *
 * @template T - The type of the base object or array
 * @param {T} base - The original object or array to be updated
 * @param {Partial<T>} partial - The partial object or array containing updates
 * @returns {T} The updated base object or array after merging
 *
 * @example
 * const baseObj = { a: 1, b: { c: 2 } };
 * const partialObj = { b: { d: 3 } };
 * const resultObj = mergePartial(baseObj, partialObj);
 * // resultObj: { a: 1, b: { c: 2, d: 3 } }
 *
 * @example
 * const baseArr = [1, 2, { a: 3 }];
 * const partialArr = [4, undefined, { b: 5 }];
 * const resultArr = mergePartial(baseArr, partialArr);
 * // resultArr: [4, 2, { a: 3, b: 5 }]
 */
export const mergePartial = (obj1: any, partial: any): any => {
  Object.keys(partial).forEach((key) => {
    const isObject = typeof partial[key] === 'object' && partial[key] !== null
    if (isObject) {
      // eslint-disable-next-line no-param-reassign
      obj1[key] = mergePartial(obj1[key], partial[key])
    } else {
      // eslint-disable-next-line no-param-reassign
      obj1[key] = partial[key]
    }
  })
  return obj1
}
