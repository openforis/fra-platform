import { TableValidationTestCase } from '../../../types'
import { plantationForestIntroducedArea } from './plantationForestIntroducedArea'
import { primaryForest } from './primaryForest'
import { totalForestArea } from './totalForestArea'

export const forestCharacteristics: Array<TableValidationTestCase> = [
  ...plantationForestIntroducedArea,
  ...primaryForest,
  ...totalForestArea,
]
