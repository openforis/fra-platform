import { useCallback } from 'react'

import { Histories } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { getStatePath } from 'client/components/Navigation/NavAssessment/History/Items/utils/getStatePath'
import { getTargetValue } from 'client/components/Navigation/NavAssessment/History/Items/utils/getTargetValue'

import { Props } from '../props'

export const useOnClick = (props: Props): (() => void) => {
  const { sectionKey } = props
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  return useCallback(() => {
    const { name } = Histories.getHistoryItemKeyParts(sectionKey)
    const path = getStatePath[name]([assessmentName, cycleName, countryIso, sectionName])
    const value = getTargetValue[name](props.datum)
    dispatch(DataActions.setValue({ path, value }))
  }, [assessmentName, countryIso, cycleName, dispatch, props.datum, sectionKey, sectionName])
}
