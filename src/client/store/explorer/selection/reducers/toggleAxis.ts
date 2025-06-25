import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { Axis, AxisSelection, AxisType } from 'meta/explorer/selection'

import { defaultAxisSelection, ExplorerSelectionState } from 'client/store/explorer/selection/state'

type Payload = {
  assessmentName: AssessmentName
  axis: Axis
  axisType: AxisType
  cycleName: CycleName
  sectionName: SectionName
}

export const toggleAxis = (state: Draft<ExplorerSelectionState>, action: PayloadAction<Payload>) => {
  const { assessmentName, axis, axisType, cycleName, sectionName } = action.payload

  const path = [assessmentName, cycleName, 'axis', sectionName]

  const { x: xCurrent = defaultAxisSelection.x, y: yCurrent = defaultAxisSelection.y } = (Objects.getInPath(
    state,
    path
  ) ?? {}) as AxisSelection

  const otherAxis = axis === Axis.x ? Axis.y : Axis.x

  const current: AxisSelection = {
    x: xCurrent,
    y: yCurrent,
  }

  const alreadySelected = current[axis].includes(axisType)

  // If selecting overflows the axis (max. 2), keep the type that would be removed
  const toSwitch = !alreadySelected && current[axis].length === 2 ? current[axis].slice(1) : []

  const newAxis = alreadySelected
    ? current[axis].filter((v) => v !== axisType)
    : [...current[axis].slice(0, 1), axisType]

  // Deselect the type from the other axis to avoid X and Y selected at the same time
  const cleanedOther = current[otherAxis].filter((v) => v !== axisType)
  const newOtherAxis = [...cleanedOther, ...toSwitch] // Append the overlflowed type

  const newSelection: AxisSelection = {
    [axis]: newAxis,
    [otherAxis]: newOtherAxis,
  } as AxisSelection

  Objects.setInPath({ obj: state, path, value: newSelection })

  return state
}
