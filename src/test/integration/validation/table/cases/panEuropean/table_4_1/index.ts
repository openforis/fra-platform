import { TableValidationTestCase } from '../../../types'
import { forest1990 } from './forest_1990'
import { totalForestAndOtherWoodedLand1990 } from './total_forest_and_other_wooded_land_1990'

export const table41: Array<TableValidationTestCase> = [...forest1990, ...totalForestAndOtherWoodedLand1990]
