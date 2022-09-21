// TODO: add state type
// TODO: add data type

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { TableDatumODP } from '@core/assessment'

export interface Validator {
  (colIdx: number, rowIdx: number): (state: any) => boolean
  (datum: TableDatumODP): (state: any) => boolean
}

export interface ValidationMessage {
  key: string
  params?: Record<string, string>
}

export type GetValidationMessages = (data: any) => (state: any) => Array<Array<ValidationMessage>>
