import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.tableData.tableDataStatus
const getTableDataStatus = createSelector(
  [
    getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName: AssessmentName, cycleName: CycleName, countryIso) =>
    state[assessmentName]?.[cycleName]?.[countryIso] ?? {}
)
export const TableDataStatusSelector = {
  getTableDataStatus,
}
