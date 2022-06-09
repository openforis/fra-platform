const normalizeString = (str: any) =>
  str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '')
export const checkMatch = (str: any, query: any) => {
  return normalizeString(str).includes(normalizeString(query))
}
