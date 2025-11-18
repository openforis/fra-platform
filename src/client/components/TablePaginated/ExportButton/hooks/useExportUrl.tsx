import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds/tablePaginateds'

import { useTablePaginatedFilters, useTablePaginatedOrderBy } from 'client/store/tablePaginated/hooks/tablePaginated'
import { useLanguage } from 'client/hooks/language'
import { useSectionRouteParams } from 'client/hooks/routeParams'

type Props = {
  path: string
}

export const useExportUrl = (props: Props): string => {
  const { path } = props

  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams()
  const orderBy = useTablePaginatedOrderBy(path)
  const filters = useTablePaginatedFilters(path)
  const lang = useLanguage()

  return useMemo<string>(() => {
    const encodedFilters = TablePaginateds.encodeFilters(filters)
    const queryParams = new URLSearchParams(
      Object.entries({
        assessmentName,
        countryIso,
        cycleName,
        filters: encodedFilters,
        lang,
        orderBy: orderBy?.property,
        orderByDirection: orderBy?.direction,
        sectionName,
      }).filter(([, value]) => !Objects.isNil(value))
    )
    return `${path}/export?${queryParams.toString()}`
  }, [assessmentName, countryIso, cycleName, filters, lang, orderBy, path, sectionName])
}
