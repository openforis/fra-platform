import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unit'

import { ExplorerSelectionState } from 'client/store/explorer/selection/state'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  sectionName: SectionName
  units: Array<{ measureName: MeasureName; unitName: UnitName }>
}

export const setUnits = (state: Draft<ExplorerSelectionState>, action: PayloadAction<Payload>) => {
  const { assessmentName, cycleName, sectionName, units } = action.payload

  units.forEach(({ measureName, unitName }) => {
    Objects.setInPath({
      obj: state,
      path: [assessmentName, cycleName, 'units', sectionName, measureName],
      value: unitName,
    })
  })

  return state
}
