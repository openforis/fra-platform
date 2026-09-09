import { TableValidationTestCase } from '../types'
import { ofWhichOnForest } from './areaAffectedByFire/of_which_on_forest'
import { totalLandAreaAffectedByFire } from './areaAffectedByFire/total_land_area_affected_by_fire'
import { areaOfPermanentForestEstate } from './areaOfPermanentForestEstate/area_of_permanent_forest_estate'
import { boreal } from './climaticDomain/boreal'
import { otherLand } from './extentOfForest/otherLand'
import { deforestation } from './forestAreaChange/deforestation'
import { totalForestArea } from './forestCharacteristics/totalForestArea'

// TODO: Add cases as they are implemented
export const cases: Array<TableValidationTestCase> = [
  ...ofWhichOnForest,
  ...totalLandAreaAffectedByFire,
  ...areaOfPermanentForestEstate,
  ...boreal,
  ...otherLand,
  ...deforestation,
  ...totalForestArea,
]
