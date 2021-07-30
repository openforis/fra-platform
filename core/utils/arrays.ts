// @ts-ignore
import * as range from 'lodash.range'
// @ts-ignore
import * as reverse from 'lodash.reverse'

const intersection = <T>(array1: T[], array2: T[]): T[] => array1.filter((item) => array2.indexOf(item) !== -1)

const startsWith = <T>(list: T[], start: T[]): boolean => start.every((item, index) => list[index] === item)

export const Arrays = {
  intersection,
  startsWith,
  range,
  reverse,
}
