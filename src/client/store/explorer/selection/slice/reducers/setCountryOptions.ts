import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ExplorerCountryOptions } from 'meta/explorer/selection'
import { Objects } from 'utils/objects'

import { ExplorerSelectionState } from 'client/store/explorer/selection/state'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  options: ExplorerCountryOptions
}

export const setCountryOptions = (state: Draft<ExplorerSelectionState>, action: PayloadAction<Payload>): void => {
  const { assessmentName, cycleName, options } = action.payload

  Objects.setInPath({
    obj: state,
    path: [assessmentName, cycleName, 'countryOptions'],
    value: options,
  })
}
