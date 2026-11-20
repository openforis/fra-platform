import { useMemo } from 'react'

import { FocusedLinkQueryParams } from 'meta/routes/queryParams/focusedLink'

import { useSearchParams } from 'client/hooks/searchParams'

type Props = Omit<FocusedLinkQueryParams, 'focusedLink'>

type Returned = string | undefined

export const useFocusedLink = (props: Props): Returned => {
  const { dataSourceUuid, descriptionName, ndpSection } = props

  const queryParams = useSearchParams<FocusedLinkQueryParams>()

  return useMemo<Returned>(() => {
    const isSameLocation =
      queryParams.dataSourceUuid === dataSourceUuid &&
      queryParams.descriptionName === descriptionName &&
      queryParams.ndpSection === ndpSection
    if (!isSameLocation) return undefined

    return queryParams.focusedLink
  }, [dataSourceUuid, descriptionName, ndpSection, queryParams])
}
