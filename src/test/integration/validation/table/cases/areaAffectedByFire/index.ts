import { TableValidationTestCase } from '../../types'
import { ofWhichOnForest } from './of_which_on_forest'
import { totalLandAreaAffectedByFire } from './total_land_area_affected_by_fire'

export const areaAffectedByFire: Array<TableValidationTestCase> = [...ofWhichOnForest, ...totalLandAreaAffectedByFire]
