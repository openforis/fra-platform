import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { VariableName } from 'meta/assessment/variable'

import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state.data.tableData.validations

const emptySummary: ValidationSummary = {
  sections: {},
  subsections: {},
  tables: {},
}

const _getCountryValidations = createSelector(
  [
    _getState,
    (_state, assessmentName: AssessmentName) => assessmentName,
    (_state, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName, cycleName, countryIso) => ({
    summary: state?.summary?.[assessmentName]?.[cycleName]?.[countryIso] ?? emptySummary,
    tables: state?.tables?.[assessmentName]?.[cycleName]?.[countryIso] ?? {},
  })
)

const getTableValidations = createSelector(
  [
    _getCountryValidations,
    (_state, _assessmentName: AssessmentName, _cycleName: CycleName, _countryIso: CountryIso, tableName: TableName) =>
      tableName,
  ],
  (countryValidations, tableName) => countryValidations.tables?.[tableName] ?? {}
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

const getSummary = createSelector([_getCountryValidations], (countryValidations) => countryValidations.summary)

export const ValidationsSelectors = {
  getSummary,
  getTableValidations,
  getNodeValidation,
}
