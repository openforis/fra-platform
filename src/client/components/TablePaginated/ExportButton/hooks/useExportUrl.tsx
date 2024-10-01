import { useMemo } from 'react'

import { TablePaginateds } from 'meta/tablePaginated'

import { useTablePaginatedOrderBy } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilters } from 'client/store/ui/tablePaginated/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  path: string
}

export const useExportUrl = (props: Props): string => {
  const { path } = props

  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams()
  const orderBy = useTablePaginatedOrderBy(path)
  const filters = useTablePaginatedFilters(path)

  return useMemo<string>(() => {
    const encodedFilters = TablePaginateds.encodeFilters(filters)
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
  }, [assessmentName, countryIso, cycleName, filters, orderBy, path, sectionName])
}
