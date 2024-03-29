import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

import { DataState } from 'client/store/data/stateType'

type Payload = {
  stateName: string
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  sectionName: string
  name: string
  value: unknown
}

export const setValue = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  const { assessmentName, countryIso, cycleName, name, sectionName, stateName, value } = action.payload
  const path = [stateName, assessmentName, cycleName, countryIso, sectionName, name]
  Objects.setInPath({ obj: state, path, value })
}
