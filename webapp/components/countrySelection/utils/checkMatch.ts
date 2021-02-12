const normalizeString = (str: any) => str.trim().toLowerCase().replace(/\s/g, '')
export const checkMatch = (str: any, query: any) => {
  return normalizeString(str).includes(normalizeString(query))
}
