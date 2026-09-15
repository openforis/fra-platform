import { TableValidationTestCase } from '../../../types'
import { forestAvailableForWoodSupplyEvenAgedStandsOfWhich1990 } from './forest_available_for_wood_supply_even_aged_stands_of_which_1990'
import { mixedForest1990 } from './mixed_forest_1990'
import { predominantlyBroadleavedForest1990 } from './predominantly_broadleaved_forest_1990'
import { predominantlyConiferousForest1990 } from './predominantly_coniferous_forest_1990'

export const table13a2: Array<TableValidationTestCase> = [
  ...forestAvailableForWoodSupplyEvenAgedStandsOfWhich1990,
  ...predominantlyConiferousForest1990,
  ...predominantlyBroadleavedForest1990,
  ...mixedForest1990,
]
