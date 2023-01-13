const normalizeString = (str: string): string => {
  return str.trim().toLowerCase().replace(/\s/g, '')
}

export const checkMatch = (str: string, query: string): boolean => {
  return normalizeString(str).includes(normalizeString(query))
}
