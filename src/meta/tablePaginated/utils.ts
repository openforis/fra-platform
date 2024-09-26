import { Objects } from 'utils/objects'

import { TablePaginatedFilterValues } from '.'

export const encodeFilters = (filters: Record<string, TablePaginatedFilterValues>): string | undefined => {
  if (Objects.isEmpty(filters)) return undefined
  return encodeURIComponent(JSON.stringify(filters))
}

export const decodeFilters = (
  encodedFilters: string | undefined
): Record<string, TablePaginatedFilterValues> | undefined => {
  if (Objects.isEmpty(encodedFilters)) return undefined
  const decodedFiltersString = decodeURIComponent(encodedFilters)
  return JSON.parse(decodedFiltersString)
}
