import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { DataSelector } from 'client/store/data/selectors'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useLastApprovedHistoryDescriptions = (): Record<
  CommentableDescriptionName,
  CommentableDescriptionValue
> => {
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()

  return useAppSelector((state) =>
    DataSelector.History.getLastApprovedDescriptions(state, {
      assessmentName,
      cycleName,
      countryIso,
      sectionName,
    })
  )
}

export const useHistoryLastApprovedDescriptionFetched = (): boolean => {
  const data = useLastApprovedHistoryDescriptions()

  return useMemo<boolean>(() => {
    return !Objects.isNil(data)
  }, [data])
}
