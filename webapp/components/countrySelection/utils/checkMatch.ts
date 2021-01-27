const normalizeString = (str) => str.trim().toLowerCase().replace(/\s/g, '')
export const checkMatch = (str, query) => {
  return normalizeString(str).includes(normalizeString(query))
}
