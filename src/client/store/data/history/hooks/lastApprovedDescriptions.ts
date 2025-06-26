import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'

import { HistorySelectors } from 'client/store/data/history/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useLastApprovedHistoryDescriptions = (): Record<
  CommentableDescriptionName,
  CommentableDescriptionValue
> => {
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()

  return useAppSelector((state) =>
    HistorySelectors.getLastApprovedDescriptions(state, { assessmentName, cycleName, countryIso, sectionName })
  )
}

export const useHistoryLastApprovedDescriptionFetched = (): boolean => {
  const data = useLastApprovedHistoryDescriptions()

  return useMemo<boolean>(() => {
    return !Objects.isNil(data)
  }, [data])
}
