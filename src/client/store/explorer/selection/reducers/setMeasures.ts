import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { MeasureName } from 'meta/measurement/measure'

import { ExplorerSelectionState } from 'client/store/explorer/selection/state'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  measures: Array<MeasureName>
  sectionName: SectionName
}

export const setMeasures = (state: Draft<ExplorerSelectionState>, action: PayloadAction<Payload>) => {
  const { assessmentName, cycleName, measures, sectionName } = action.payload

  Objects.setInPath({
    obj: state,
    path: [assessmentName, cycleName, 'measures', sectionName],
    value: measures,
  })

  return state
}
