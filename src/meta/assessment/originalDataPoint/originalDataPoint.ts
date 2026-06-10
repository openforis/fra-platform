import { CountryIso } from 'meta/area/countryIso' // import { ODPValidation } from './odpValidation'
import { TableNames } from 'meta/assessment/table'
import { UUID } from 'meta/uuid/uuid'

import { ODPDataSourceMethod } from './odpDataSource' // import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass'
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

export type OriginalDataPointCommentKey = TableNames.extentOfForest | TableNames.forestCharacteristics

export type OriginalDataPointComments = Partial<Record<OriginalDataPointCommentKey, string>>

export interface OriginalDataPoint {
  comments: OriginalDataPointComments
  countryIso: CountryIso
  dataSourceAdditionalComments?: string
  dataSourceMethods?: Array<ODPDataSourceMethod>
  dataSourceReferences?: string
  id: number
  nationalClasses?: Array<ODPNationalClass>
  readonly uuid?: UUID
  values: OriginalDataPointValues
  year?: number
  // editStatus?: ODPEditStatus
  // reservedYears?: Array<number>
  // validationStatus?: ODPValidation
}
