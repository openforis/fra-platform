import chunk from 'lodash.chunk'
import differenceWith from 'lodash.differencewith'
import range from 'lodash.range'
import reverse from 'lodash.reverse'
import union from 'lodash.union'
import uniqueBy from 'lodash.uniqby'
import uniqWith from 'lodash.uniqwith'

import { Objects } from './objects'

const difference = <T1, T2>(array1: Array<T1>, array2: Array<T2>): Array<T1> =>
  differenceWith<T1, T2>(array1, array2, Objects.isEqual)

const intersection = <T>(array1: Array<T>, array2: Array<T>): Array<T> =>
  array1.filter((item) => array2.indexOf(item) !== -1)

const startsWith = <T>(list: Array<T>, start: Array<T>): boolean => start.every((item, index) => list[index] === item)

const unique = <T>(array: Array<T>): Array<T> => uniqWith(array, Objects.isEqual)

export const Arrays = {
  chunk,
  difference,
  intersection,
  range,
  reverse,
  startsWith,
  union,
  unique,
  uniqueBy,
}
