import { useMemo } from 'react'

import { TablePaginatedFilterType, TablePaginateds } from 'meta/tablePaginated'

import { useTablePaginatedOrderBy } from 'client/store/ui/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useFilterValues } from 'client/components/TablePaginated/hooks/useFilterValues'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

export const useExportUrl = (props: Props): string => {
  const { filters, path } = props

  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams()
  const orderBy = useTablePaginatedOrderBy(path)
  const filterValues = useFilterValues({ filters, path })

  return useMemo<string>(() => {
    const encodedFilters = TablePaginateds.encodeFilters(filterValues)
    const queryParams = new URLSearchParams(
      Object.entries({
        assessmentName,
        countryIso,
        cycleName,
        filters: encodedFilters,
        orderBy: orderBy?.property,
        orderByDirection: orderBy?.direction,
        sectionName,
      }).filter(([, value]) => value !== undefined)
    )
    return `${path}/export?${queryParams.toString()}`
  }, [assessmentName, countryIso, cycleName, filterValues, orderBy, path, sectionName])
}
