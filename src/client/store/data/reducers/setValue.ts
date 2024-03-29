import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

import { DataState } from 'client/store/data/stateType'

type Payload = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  name: string
  sectionName: string
  subSection: string
  value: unknown
}

export const setValue = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  const { assessmentName, countryIso, cycleName, name, sectionName, subSection, value } = action.payload
  const path = [subSection, assessmentName, cycleName, countryIso, sectionName, name]
  Objects.setInPath({ obj: state, path, value })
}
