import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

export type RecordTableValidationsState = Record<TableName, Record<ColName, Record<VariableName, NodeValueValidation>>>

export type ValidationsState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, RecordTableValidationsState>>
>

export const initialState: ValidationsState = {}
