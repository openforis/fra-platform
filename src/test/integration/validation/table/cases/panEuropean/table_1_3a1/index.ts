import { TableValidationTestCase } from '../../../types'
import { availableForWoodSupplyOfWhich1990 } from './available_for_wood_supply_of_which_1990'
import { forestEvenAgedStandsOfWhich1990 } from './forest_even_aged_stands_of_which_1990'
import { mixedForest1990 } from './mixed_forest_1990'
import { predominantlyBroadleavedForest1990 } from './predominantly_broadleaved_forest_1990'
import { predominantlyConiferousForest1990 } from './predominantly_coniferous_forest_1990'

export const table13a1: Array<TableValidationTestCase> = [
  ...forestEvenAgedStandsOfWhich1990,
  ...availableForWoodSupplyOfWhich1990,
  ...predominantlyConiferousForest1990,
  ...predominantlyBroadleavedForest1990,
  ...mixedForest1990,
]
