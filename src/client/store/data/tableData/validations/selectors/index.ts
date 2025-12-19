import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.tableData.validations

const getTableValidations = createSelector(
  [
    getState,
    (_state, assessmentName: AssessmentName) => assessmentName,
    (_state, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, _countryIso: CountryIso, tableName: TableName) =>
      tableName,
  ],
  (data, assessmentName, cycleName, countryIso, tableName) =>
    data?.[assessmentName]?.[cycleName]?.[countryIso]?.[tableName] ?? {}
)

const getNodeValidation = createSelector(
  [
    getTableValidations,
    (
      _state,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _tableName: TableName,
      colName: ColName
    ) => colName,
    (
      _state,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _tableName: TableName,
      _colName: ColName,
      variableName: VariableName
    ) => variableName,
  ],
  (tableValidations, colName, variableName) => tableValidations?.[colName]?.[variableName] ?? { valid: true }
)

export const ValidationsSelectors = {
  getTableValidations,
  getNodeValidation,
}
