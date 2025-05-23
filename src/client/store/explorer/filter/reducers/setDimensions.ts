import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { DimensionName } from 'meta/measurement/dimension'

import { ExplorerFilterState } from 'client/store/explorer/filter/state'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  dimensions: Array<DimensionName>
  sectionName: SectionName
}

export const setDimensions = (state: Draft<ExplorerFilterState>, action: PayloadAction<Payload>) => {
  const { assessmentName, cycleName, dimensions, sectionName } = action.payload

  Objects.setInPath({
    obj: state,
    path: [assessmentName, cycleName, 'dimensions', sectionName],
    value: dimensions,
  })

  return state
}
