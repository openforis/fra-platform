import { TableValidationTestCase } from '../types'
import { ofWhichOnForest } from './areaAffectedByFire/of_which_on_forest'
import { totalLandAreaAffectedByFire } from './areaAffectedByFire/total_land_area_affected_by_fire'
import { areaOfPermanentForestEstate } from './areaOfPermanentForestEstate/area_of_permanent_forest_estate'
import { boreal } from './climaticDomain/boreal'
import { subTropical } from './climaticDomain/sub_tropical'
import { temperate } from './climaticDomain/temperate'
import { tropical } from './climaticDomain/tropical'
import { expectedYearForNextCountryReportUpdate } from './contactPersons/expectedYearForNextCountryReportUpdate'
import { degradedAreaForThatYear } from './degradedForestMonitoring2025/degradedAreaForThatYear'
import { yearOfLatestAssessment } from './degradedForestMonitoring2025/yearOfLatestAssessment'
import { diseases } from './disturbances/diseases'
import { insects } from './disturbances/insects'
import { other } from './disturbances/other'
import { severeWeatherEvents } from './disturbances/severe_weather_events'
import { otherLand } from './extentOfForest/otherLand'
import { otherWoodedLand } from './extentOfForest/otherWoodedLand'
import { deforestation } from './forestAreaChange/deforestation'
import { totalForestArea } from './forestCharacteristics/totalForestArea'

// TODO: Add cases at the end to avoid conflicting PRs
export const cases: Array<TableValidationTestCase> = [
  ...ofWhichOnForest,
  ...totalLandAreaAffectedByFire,
  ...areaOfPermanentForestEstate,
  ...boreal,
  ...subTropical,
  ...temperate,
  ...tropical,
  ...expectedYearForNextCountryReportUpdate,
  ...degradedAreaForThatYear,
  ...yearOfLatestAssessment,
  ...diseases,
  ...insects,
  ...other,
  ...severeWeatherEvents,
  ...otherLand,
  ...otherWoodedLand,
  ...deforestation,
  ...totalForestArea,
]
