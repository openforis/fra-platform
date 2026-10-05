import { TableValidationTestCase } from '../../../types'
import { ofWhichAvailableForWoodSupply1990 } from './_of_which_available_for_wood_supply_1990'
import { forest1990 } from './forest_1990'
import { otherWoodedLand1990 } from './other_wooded_land_1990'
import { totalForestAndOtherWoodedLand1990 } from './total_forest_and_other_wooded_land_1990'

export const table12a: Array<TableValidationTestCase> = [
  ...forest1990,
  ...ofWhichAvailableForWoodSupply1990,
  ...otherWoodedLand1990,
  ...totalForestAndOtherWoodedLand1990,
]
