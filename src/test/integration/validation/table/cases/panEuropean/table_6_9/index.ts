import { TableValidationTestCase } from '../../../types'
import { energyFromDirectWoodFibreSources } from './energy_from_direct_wood_fibre_sources'
import { totalEnergySupplyFromWood } from './total_energy_supply_from_wood'

export const table69: Array<TableValidationTestCase> = [
  ...totalEnergySupplyFromWood,
  ...energyFromDirectWoodFibreSources,
]
