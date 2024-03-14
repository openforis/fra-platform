import { CountryIso } from 'meta/area'

import { ODPDataSourceMethod } from './odpDataSource' // import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass' // import { ODPValidation } from './odpValidation'
// import { ODPValidation } from './odpValidation'

export interface OriginalDataPointValues {
  // Extent of forest
  forestArea?: string
  otherWoodedLand?: string
  // otherLand?: string
  // totalLandArea?: string

  // Forest area change
  naturalForestArea?: string
  otherPlantedForestArea?: string
  plantationForestArea?: string
  plantationForestIntroducedArea?: string
  // plantedForest?: string
  primaryForest?: string
  primaryForestPercent?: string
  // totalForestArea?: string
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
