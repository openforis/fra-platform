import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { ExplorerOrderBy } from 'meta/explorer/selection'
import { Objects } from 'utils/objects'

import { ExplorerSelectionState } from 'client/store/explorer/selection/state'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  orderBy: ExplorerOrderBy | null
  sectionName: SectionName
}

export const setOrderBy = (state: Draft<ExplorerSelectionState>, action: PayloadAction<Payload>): void => {
  const { assessmentName, cycleName, orderBy, sectionName } = action.payload

  const path = [assessmentName, cycleName, 'orderBy', sectionName]
  Objects.setInPath({ obj: state, path, value: orderBy })
}
