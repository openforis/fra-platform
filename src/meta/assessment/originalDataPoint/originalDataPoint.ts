import { CountryIso } from 'meta/area'

import { ODPDataSourceMethod } from './odpDataSource' // import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass' // import { ODPValidation } from './odpValidation'
// import { ODPValidation } from './odpValidation'

export interface OriginalDataPointValues {
  // Extent of forest
  forestArea?: number
  otherWoodedLand?: number
  // otherLand?: number
  // totalLandArea?: number

  // Forest area change
  naturalForestArea?: number
  otherPlantedForestArea?: number
  plantationForestArea?: number
  plantationForestIntroducedArea?: number
  // plantedForest?: number
  primaryForest?: number
  primaryForestPercent?: number
  // totalForestArea?: number
}

export interface OriginalDataPoint {
  id: number
  countryIso: CountryIso
  year?: number
  dataSourceAdditionalComments?: string
  dataSourceMethods?: Array<ODPDataSourceMethod>
  dataSourceReferences?: string
  description?: string
  nationalClasses?: Array<ODPNationalClass>
  values: OriginalDataPointValues
  // editStatus?: ODPEditStatus
  // reservedYears?: Array<number>
  // validationStatus?: ODPValidation
}
