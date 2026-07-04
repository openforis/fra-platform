import { LinkLocationBase } from 'meta/cycleData/links/linkLocationBase'
import { UUID } from 'meta/uuid/uuid'

export enum NDPLinkField {
  commentsExtentOfForest = 'comments_extentofforest',
  commentsForestCharacteristics = 'comments_forestcharacteristics',
  dataSourceReferences = 'data_source_references',
}

export const NDPLinkFields: Array<NDPLinkField> = Object.values(NDPLinkField)

export type NDPLinkTarget = {
  odpUuid: UUID
  fields: Array<NDPLinkField>
}

// `identifier` from LinkLocationBase holds the odp uuid
export type NationalDataPointLinkLocation = LinkLocationBase & {
  sectionName: 'originalDataPoint'
  odpSection: string
  // Set when the location is a data source reference location within the odp.
  dataSourceUuid?: string
  year: number
}
