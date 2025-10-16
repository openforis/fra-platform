import { useCallback, useEffect, useState } from 'react'

import { Axis, AxisSelection, AxisType } from 'meta/explorer/selection'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerAxisSelection } from 'client/store/explorer/selection/hooks/axisSelection'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

type Props = {
  axis: Axis
  axisType: AxisType
  currentSelection: AxisSelection
}

const _toggleAxis = (props: Props): AxisSelection => {
  const { axis, axisType, currentSelection } = props
  const otherAxis = axis === Axis.x ? Axis.y : Axis.x

  const alreadySelected = currentSelection[axis].includes(axisType)

  // If selecting overflows the axis (max. 2), keep the type that would be removed
  const toSwitch = !alreadySelected && currentSelection[axis].length === 2 ? currentSelection[axis].slice(1) : []

  const newAxis = alreadySelected
    ? currentSelection[axis].filter((v) => v !== axisType)
    : [...currentSelection[axis].slice(0, 1), axisType]

  // Deselect the type from the other axis to avoid X and Y selected at the same time
  const cleanedOther = currentSelection[otherAxis].filter((v) => v !== axisType)
  const newOtherAxis = [...cleanedOther, ...toSwitch] // Append the overflowed type

  const newSelection = {
    [axis]: newAxis,
    [otherAxis]: newOtherAxis,
  } as AxisSelection

  return newSelection
}

type Returned = {
  axisSelection: AxisSelection
  resetAxisSelection: () => void
  toggleAxis: (props: Omit<Props, 'currentSelection'>) => void
  applyAxisSelection: () => void
}

export const useToggleAxis = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  const storeAxisSelection = useExplorerAxisSelection()
  const [localAxisSelection, setLocalAxisSelection] = useState<AxisSelection>(storeAxisSelection)

  useEffect(() => {
    setLocalAxisSelection(storeAxisSelection)
  }, [storeAxisSelection])

  const toggleAxis = useCallback((props: Omit<Props, 'currentSelection'>) => {
    setLocalAxisSelection((prev) => _toggleAxis({ ...props, currentSelection: prev }))
  }, [])

  const resetAxisSelection = useCallback(() => {
    setLocalAxisSelection(storeAxisSelection)
  }, [storeAxisSelection])

  const applyAxisSelection = useCallback<Returned['applyAxisSelection']>(() => {
    return dispatch(
      ExplorerSelectionActions.setAxisSelection({
        assessmentName,
        axisSelection: localAxisSelection,
        cycleName,
        sectionName,
      })
    )
  }, [assessmentName, cycleName, dispatch, localAxisSelection, sectionName])

  return {
    applyAxisSelection,
    axisSelection: localAxisSelection,
    resetAxisSelection,
    toggleAxis,
  }
}
