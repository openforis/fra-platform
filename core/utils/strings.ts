// @ts-ignore
import * as snakeCase from 'lodash.snakecase'

export const normalize = (string: string): string =>
  string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase()

export const Strings = {
  normalize,
  snakeCase,
}
