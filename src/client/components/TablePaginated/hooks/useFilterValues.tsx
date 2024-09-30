import { useMemo } from 'react'

import { TablePaginatedFilterType, TablePaginatedFilterValues } from 'meta/tablePaginated'

import { useTablePaginatedFilters } from 'client/store/ui/tablePaginated/hooks'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

type Returned = Record<string, TablePaginatedFilterValues>

export const useFilterValues = (props: Props): Returned => {
  const { filters, path } = props

  const activeFilterValues = useTablePaginatedFilters(path)

  const hiddenFilterValues = useMemo<Returned>(() => {
    return filters.reduce((acc, { hidden, defaultValue, fieldName }) => {
      if (hidden && defaultValue !== undefined) {
        // eslint-disable-next-line no-param-reassign
        acc[fieldName] = defaultValue
      }
      return acc
    }, {} as Returned)
  }, [filters])

  const allFilterValues = useMemo<Returned>(() => {
    return { ...hiddenFilterValues, ...activeFilterValues }
  }, [activeFilterValues, hiddenFilterValues])

  return allFilterValues
}
