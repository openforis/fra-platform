import { TableValidationTestCase } from '../../../types'
import { conservationOfBiodiversity } from './conservation_of_biodiversity'
import { multipleUse } from './multiple_use'
import { other } from './other'
import { production } from './production'
import { protectionOfSoilAndWater } from './protection_of_soil_and_water'
import { socialServices } from './social_services'
import { totalForestArea } from './totalForestArea'
import { unknown } from './unknown'

export const primaryDesignatedManagementObjective: Array<TableValidationTestCase> = [
  ...conservationOfBiodiversity,
  ...multipleUse,
  ...other,
  ...production,
  ...protectionOfSoilAndWater,
  ...socialServices,
  ...totalForestArea,
  ...unknown,
]
