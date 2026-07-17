import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

import { TableValidationState } from 'client/store/data/validations/tables/state'
import { RootState } from 'client/store/types'

const _getState = (state: RootState): TableValidationState | undefined => state.data.validations.tables

const _getCountryTableValidations = createSelector(
  [
    _getState,
    (_state: RootState, assessmentName: AssessmentName) => assessmentName,
    (_state: RootState, _assessmentName: AssessmentName, cycleName: CycleName) => cycleName,
    (_state: RootState, _assessmentName: AssessmentName, _cycleName: CycleName, countryIso: CountryIso) => countryIso,
  ],
  (state, assessmentName, cycleName, countryIso) => state?.[assessmentName]?.[cycleName]?.[countryIso] ?? {}
)

const getTableValidations = createSelector(
  [
    _getCountryTableValidations,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      tableName: TableName
    ) => tableName,
  ],
  (countryTableValidations, tableName) => countryTableValidations?.[tableName] ?? {}
)

const getNodeValidation = createSelector(
  [
    getTableValidations,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      _tableName: TableName,
      colName: ColName
    ) => colName,
    (
      _state: RootState,
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

export const TableValidationSelectors = {
  getNodeValidation,
  getTableValidations,
}
