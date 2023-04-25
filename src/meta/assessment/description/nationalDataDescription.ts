import { NationalDataDataSourceDescription } from '@meta/assessment/description/nationalDataDataSourceDescription'

export interface NationalDataDescription {
  dataSources?: NationalDataDataSourceDescription
  nationalClassification?: boolean
  originalData?: boolean
}
