import { TableValidationTestCase } from '../../types'
import { forestArea } from './forestArea'
import { otherLand } from './otherLand'
import { otherWoodedLand } from './otherWoodedLand'

export const extentOfForest: Array<TableValidationTestCase> = [...forestArea, ...otherLand, ...otherWoodedLand]
