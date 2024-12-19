import { Objects } from 'utils/objects'

import { TablePaginatedFilterValues } from 'meta/tablePaginated'

type FiltersBase = Record<string, TablePaginatedFilterValues>

const encodeFilters = <Filters = FiltersBase>(filters: Filters): string | undefined => {
  if (Objects.isEmpty(filters)) return undefined
  return encodeURIComponent(JSON.stringify(filters))
}

const decodeFilters = <Filters = FiltersBase>(encodedFilters: string | undefined): Filters => {
  if (Objects.isEmpty(encodedFilters)) return {} as Filters
  const decodedFiltersString = decodeURIComponent(encodedFilters)
  return JSON.parse(decodedFiltersString)
}

export const TablePaginateds = {
  decodeFilters,
  encodeFilters,
}
