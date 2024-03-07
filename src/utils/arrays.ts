// @ts-ignore
import * as differenceWith from 'lodash.differencewith'
// @ts-ignore
import * as range from 'lodash.range'
// @ts-ignore
import * as reverse from 'lodash.reverse'
// @ts-ignore
import * as uniqueBy from 'lodash.uniqby'
// @ts-ignore
import * as uniqWith from 'lodash.uniqwith'

import { Objects } from './objects'

const difference = <T1, T2>(array1: Array<T1>, array2: Array<T2>): Array<T1> =>
  differenceWith<T1, T2>(array1, array2, Objects.isEqual)

const intersection = <T>(array1: T[], array2: T[]): T[] => array1.filter((item) => array2.indexOf(item) !== -1)

const startsWith = <T>(list: T[], start: T[]): boolean => start.every((item, index) => list[index] === item)

const unique = <T>(array: Array<T>): Array<T> => uniqWith(array, Objects.isEqual)

export const Arrays = {
  difference,
  intersection,
  startsWith,
  range,
  reverse,
  unique,
  uniqueBy,
}
