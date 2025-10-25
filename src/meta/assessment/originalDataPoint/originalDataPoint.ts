import { CountryIso } from 'meta/area'

import { ODPDataSourceMethod } from './odpDataSource' // import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass' // import { ODPValidation } from './odpValidation'
// import { ODPValidation } from './odpValidation'

export interface OriginalDataPointValues {
  // Extent of forest
  forestArea?: string
  otherWoodedLand?: string

  // Forest area change
  naturalForestArea?: string
  otherPlantedForestArea?: string
  plantationForestArea?: string
  plantationForestIntroducedArea?: string
  plantedForest?: string
  primaryForest?: string
  primaryForestPercent?: string
  total?: string
  totalForestArea?: string
}

export interface OriginalDataPoint {
  commentsExtentOfForest?: string
  commentsForestCharacteristics?: string
  countryIso: CountryIso
  dataSourceAdditionalComments?: string
  dataSourceMethods?: Array<ODPDataSourceMethod>
  dataSourceReferences?: string
  id: number
  nationalClasses?: Array<ODPNationalClass>
  values: OriginalDataPointValues
  year?: number
  // editStatus?: ODPEditStatus
  // reservedYears?: Array<number>
  // validationStatus?: ODPValidation
}
