/**
 * Returns list of previous year or undefined is it's first year
 * @param year Current ODP year
 * @param years List of reserved ODP years
 */
export const getPreviousODPYears = (year: number, years: Array<number>): Array<number> | undefined => {
  const arr = [...years]
  // Add and sort current year
  arr.push(year)
  arr.sort()
  // Find position of current year
  const idx = arr.findIndex((y) => y === year)
  return idx === 0 ? undefined : arr.slice(0, idx)
}
