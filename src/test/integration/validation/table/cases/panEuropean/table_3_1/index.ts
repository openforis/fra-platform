import { TableValidationTestCase } from '../../../types'
import { ofWhichForestAvailableForWoodSupply1990 } from './_of_which_forest_available_for_wood_supply_1990'
import { forest1990 } from './forest_1990'

export const table31: Array<TableValidationTestCase> = [...forest1990, ...ofWhichForestAvailableForWoodSupply1990]
