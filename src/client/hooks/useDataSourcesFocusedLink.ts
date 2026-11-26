import { useMemo } from 'react'

import { FocusedLinkQueryParams } from 'meta/routes/queryParams/focusedLink'
import { Objects } from 'utils/objects'

import { useSearchParams } from 'client/hooks/searchParams'
import { useFocusedLink } from 'client/hooks/useFocusedLink'
import { DataSourcesFocusedLink } from 'client/components/DataSources/types'

type Props = Pick<FocusedLinkQueryParams, 'descriptionName' | 'ndpSection'>

type Returned = DataSourcesFocusedLink | undefined

export const useDataSourcesFocusedLink = (props: Props): Returned => {
  const { descriptionName, ndpSection } = props

  const { dataSourceUuid } = useSearchParams<FocusedLinkQueryParams>()
  const link = useFocusedLink({ dataSourceUuid, descriptionName, ndpSection })

  return useMemo<Returned>(() => {
    const hasFocusedLink = !Objects.isNil(link) && !Objects.isEmpty(dataSourceUuid)
    if (!hasFocusedLink) return undefined

    return { dataSourceUuid, link }
  }, [dataSourceUuid, link])
}
