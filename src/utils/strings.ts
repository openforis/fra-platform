import snake from 'to-snake-case'

const nbspToUnicode = (string: string): string => {
  return string.replaceAll('&nbsp;', '\u00A0')
}

export const normalize = (string: string): string =>
  string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase()

export const Strings = {
  nbspToUnicode,
  normalize,
  snakeCase: snake,
}
