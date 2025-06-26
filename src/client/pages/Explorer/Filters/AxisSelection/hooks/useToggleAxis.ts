import { useCallback } from 'react'

import { Axis, AxisType } from 'meta/explorer/selection'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Returned = (props: { axis: Axis; axisType: AxisType }) => void

export const useToggleAxis = (): Returned => {
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useCallback<Returned>(
    (props) => {
      const { axis, axisType } = props
      return dispatch(
        ExplorerSelectionActions.toggleAxis({
          assessmentName,
          axis,
          axisType,
          cycleName,
          sectionName,
        })
      )
    },
    [assessmentName, cycleName, dispatch, sectionName]
  )
}
