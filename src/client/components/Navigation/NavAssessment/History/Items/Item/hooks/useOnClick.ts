import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { getStatePath } from 'client/components/Navigation/NavAssessment/History/Items/utils/getStatePath'
import { getTargetValue } from 'client/components/Navigation/NavAssessment/History/Items/utils/getTargetValue'

import { Props } from '../props'

export const useOnClick = (props: Props): (() => void) => {
  const { target } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()

  return useCallback(() => {
    const path = getStatePath[target]([assessmentName, cycleName, countryIso, sectionName])
    const value = getTargetValue[target](props.datum)

    dispatch(DataActions.setValue({ path, value }))
  }, [assessmentName, countryIso, cycleName, dispatch, props.datum, sectionName, target])
}
