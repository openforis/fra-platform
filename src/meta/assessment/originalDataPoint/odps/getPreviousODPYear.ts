/**
 * Returns previous year or undefined is it's first year
 * @param year Current ODP year
 * @param years List of reserved ODP years
 */
export const getPreviousODPYear = (year: number, years: Array<number>): number | undefined => {
  const arr = [...years]
  // Add and sort current year
  arr.push(year)
  arr.sort()
  // Find position of current year
  const idx = arr.findIndex((y) => y === year)
  return arr[idx - 1]
}
