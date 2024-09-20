import { useMemo } from 'react'

import { useTablePaginatedOrderBy } from 'client/store/ui/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  path: string
}

export const useExportUrl = (props: Props): string => {
  const { path } = props

  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams()
  const orderBy = useTablePaginatedOrderBy(path)

  return useMemo<string>(() => {
    const queryParams = new URLSearchParams(
      Object.entries({
        assessmentName,
        countryIso,
        cycleName,
        orderBy: orderBy?.property,
        orderByDirection: orderBy?.direction,
        sectionName,
      }).filter(([, value]) => value !== undefined)
    )
    return `${path}/export?${queryParams.toString()}`
  }, [assessmentName, countryIso, cycleName, orderBy, path, sectionName])
}
