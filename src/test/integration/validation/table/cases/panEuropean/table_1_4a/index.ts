import { TableValidationTestCase } from '../../../types'
import { forest1990 } from './forest_1990'
import { otherWoodedLand1990 } from './other_wooded_land_1990'

export const table14a: Array<TableValidationTestCase> = [...forest1990, ...otherWoodedLand1990]
