import { TableValidationTestCase } from '../../../types'
import { broadleaved2015 } from './broadleaved_2015'
import { coniferous2015 } from './coniferous_2015'
import { forest1990 } from './forest_1990'
import { otherWoodedLand1990 } from './other_wooded_land_1990'
import { totalForestAndOtherWoodedLand1990 } from './total_forest_and_other_wooded_land_1990'

export const table45: Array<TableValidationTestCase> = [
  ...forest1990,
  ...otherWoodedLand1990,
  ...totalForestAndOtherWoodedLand1990,
  ...coniferous2015,
  ...broadleaved2015,
]
