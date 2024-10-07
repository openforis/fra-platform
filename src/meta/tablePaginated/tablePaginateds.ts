import { Objects } from 'utils/objects'

import { TablePaginatedFilterValues } from 'meta/tablePaginated'

type Returned = Record<string, TablePaginatedFilterValues>

const encodeFilters = (filters: Returned): string | undefined => {
  if (Objects.isEmpty(filters)) return undefined
  return encodeURIComponent(JSON.stringify(filters))
}

const decodeFilters = (encodedFilters: string | undefined): Returned | undefined => {
  if (Objects.isEmpty(encodedFilters)) return undefined
  const decodedFiltersString = decodeURIComponent(encodedFilters)
  return JSON.parse(decodedFiltersString)
}

export const TablePaginateds = {
  decodeFilters,
  encodeFilters,
}
