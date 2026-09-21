import { TableValidationTestCase } from '../../../types'
import { mixedForest } from './mixed_forest'
import { predominantlyBroadleavedForest } from './predominantly_broadleaved_forest'
import { predominantlyConiferousForest } from './predominantly_coniferous_forest'

export const table12b: Array<TableValidationTestCase> = [
  ...predominantlyConiferousForest,
  ...predominantlyBroadleavedForest,
  ...mixedForest,
]
