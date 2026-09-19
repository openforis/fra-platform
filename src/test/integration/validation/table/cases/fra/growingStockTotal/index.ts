import { TableValidationTestCase } from '../../../types'
import { forest } from './forest'
import { naturallyRegeneratingForest } from './naturallyRegeneratingForest'
import { otherPlantedForest } from './otherPlantedForest'
import { plantationForest } from './plantationForest'
import { plantationForestIntroducedArea } from './plantationForestIntroducedArea'
import { plantedForest } from './plantedForest'
import { primaryForest } from './primaryForest'

export const growingStockTotal: Array<TableValidationTestCase> = [
  ...forest,
  ...naturallyRegeneratingForest,
  ...plantedForest,
  ...otherPlantedForest,
  ...plantationForest,
  ...plantationForestIntroducedArea,
  ...primaryForest,
]
