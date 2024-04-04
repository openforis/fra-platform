import { useEffect } from 'react'

import { Histories, HistoryItemSectionKey } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Navigation/NavAssessment/History/hooks/useData'
import { getStatePath } from 'client/components/Navigation/NavAssessment/History/Items/utils/getStatePath'
import { getTargetValue } from 'client/components/Navigation/NavAssessment/History/Items/utils/getTargetValue'

// Reset the state to its original state

export const useResetState = (sectionKey: HistoryItemSectionKey): void => {
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const dispatch = useAppDispatch()
  const data = useData(sectionKey)

  useEffect(() => {
    return () => {
      if (data) {
        const { name } = Histories.getHistoryItemKeyParts(sectionKey)
        const value = getTargetValue[name](data?.at(0))
        const path = getStatePath[name]([assessmentName, cycleName, countryIso, sectionName])
        dispatch(DataActions.setValue({ value, path }))
      }
    }
  }, [assessmentName, countryIso, cycleName, data, dispatch, sectionKey, sectionName])
}
