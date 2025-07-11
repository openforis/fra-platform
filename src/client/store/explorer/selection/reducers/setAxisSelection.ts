import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { AxisSelection } from 'meta/explorer/selection'

import { ExplorerSelectionState } from 'client/store/explorer/selection/state'

type Payload = {
  assessmentName: AssessmentName
  axisSelection: AxisSelection
  cycleName: CycleName
  sectionName: SectionName
}

export const setAxisSelection = (state: Draft<ExplorerSelectionState>, action: PayloadAction<Payload>) => {
  const { assessmentName, axisSelection, cycleName, sectionName } = action.payload

  const path = [assessmentName, cycleName, 'axis', sectionName]

  Objects.setInPath({ obj: state, path, value: axisSelection })

  return state
}
