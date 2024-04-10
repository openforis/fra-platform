import { useEffect } from 'react'

import { HistoryTarget } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Navigation/NavAssessment/History/hooks/useData'
import { getStatePath } from 'client/components/Navigation/NavAssessment/History/Items/utils/getStatePath'
import { getTargetValue } from 'client/components/Navigation/NavAssessment/History/Items/utils/getTargetValue'

// Reset the state to its original state

export const useResetState = (target: HistoryTarget): void => {
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const dispatch = useAppDispatch()
  const data = useData(target)

  useEffect(() => {
    return () => {
      if (data) {
        const value = getTargetValue[target](data?.at(0))
        const path = getStatePath[target]([assessmentName, cycleName, countryIso, sectionName])
        dispatch(DataActions.setValue({ value, path }))
      }
    }
  }, [assessmentName, countryIso, cycleName, data, dispatch, target, sectionName])
}
