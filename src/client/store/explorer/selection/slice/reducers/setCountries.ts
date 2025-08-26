import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { ExplorerSelectionState } from 'client/store/explorer/selection/state'

type Payload = {
  assessmentName: AssessmentName
  countries: Array<CountryIso>
  cycleName: CycleName
}

export const setCountries = (state: Draft<ExplorerSelectionState>, action: PayloadAction<Payload>): void => {
  const { assessmentName, countries, cycleName } = action.payload

  Objects.setInPath({
    obj: state,
    path: [assessmentName, cycleName, 'countries'],
    value: countries,
  })
}
