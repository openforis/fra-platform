import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

import { DataState, RecordTableValidationsState } from 'client/store/data/stateType'

type Payload = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableValidations: RecordTableValidationsState
}

export const setNodeValueValidations = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  const { assessmentName, cycleName, countryIso, tableValidations } = action.payload

  if (!state.nodeValueValidations[assessmentName]) state.nodeValueValidations[assessmentName] = {}
  // @ts-ignore
  if (!state.nodeValueValidations[assessmentName][cycleName]) state.nodeValueValidations[assessmentName][cycleName] = {}
  if (!state.nodeValueValidations[assessmentName][cycleName][countryIso])
    state.nodeValueValidations[assessmentName][cycleName][countryIso] = {}
  state.nodeValueValidations[assessmentName][cycleName][countryIso] = {
    ...state.nodeValueValidations[assessmentName][cycleName][countryIso],
    ...tableValidations,
  }
}
