import { useCallback } from 'react'

import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unit'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  measureName: MeasureName
}

type Returned = (unitName: UnitName) => void

export const useOnUnitChange = (props: Props): Returned => {
  const { measureName } = props

  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useCallback<Returned>(
    (unitName) => {
      dispatch(
        ExplorerSelectionActions.setUnits({
          assessmentName,
          cycleName,
          measureName,
          sectionName,
          unitName,
        })
      )
    },
    [assessmentName, cycleName, dispatch, measureName, sectionName]
  )
}
