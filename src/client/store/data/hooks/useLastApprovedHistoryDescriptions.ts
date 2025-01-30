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
