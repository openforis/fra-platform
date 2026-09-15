import { TableValidationTestCase } from '../../../types'
import { conservationOfBiodiversity } from './conservation_of_biodiversity'
import { other } from './other'
import { production } from './production'
import { protectionOfSoilAndWater } from './protection_of_soil_and_water'
import { socialServices } from './social_services'

export const totalAreaWithDesignatedManagementObjective: Array<TableValidationTestCase> = [
  ...conservationOfBiodiversity,
  ...other,
  ...production,
  ...protectionOfSoilAndWater,
  ...socialServices,
]
