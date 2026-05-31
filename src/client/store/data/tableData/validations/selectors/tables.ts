import { createSelector } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

import { RootState } from 'client/store/types'

import { getCountryValidations } from './base'

export const getTableValidations = createSelector(
  [
    getCountryValidations,
    (
      _state: RootState,
      _assessmentName: AssessmentName,
      _cycleName: CycleName,
      _countryIso: CountryIso,
      tableName: TableName
    ) => tableName,
  ],
  (countryValidations, tableName) => countryValidations.tables?.[tableName] ?? {}
)

export const getNodeValidation = createSelector(
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
