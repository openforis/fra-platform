import { CountryIso } from 'meta/area/countryIso'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint/odpDataSource'
import { TableNames } from 'meta/assessment/table'
import { UUID } from 'meta/uuid/uuid'

import { ODPNationalClass } from './odpNationalClass'

export interface OriginalDataPointValues {
  // Extent of forest
  forestArea?: string
  otherWoodedLand?: string

  // Forest characteristics
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
  dataSources?: Array<DataSource>
  nationalClasses?: Array<ODPNationalClass>
  readonly id: number
  readonly uuid: UUID
  values: OriginalDataPointValues
  year?: number

  /**
   * @deprecated
   */
  dataSourceAdditionalComments?: string
  /**
   * @deprecated
   */
  dataSourceMethods?: Array<ODPDataSourceMethod>
  /**
   * @deprecated
   */
  dataSourceReferences?: string
}
