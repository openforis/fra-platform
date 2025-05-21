import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { ExplorerFilterState } from 'client/store/explorer/filter/state'

type Payload = {
  assessmentName: AssessmentName
  countries: Array<CountryIso>
  cycleName: CycleName
}

export const setCountries = (state: Draft<ExplorerFilterState>, action: PayloadAction<Payload>) => {
  const { assessmentName, countries, cycleName } = action.payload

  Objects.setInPath({
    obj: state,
    path: [assessmentName, cycleName, 'countries'],
    value: countries,
  })

  return state
}
