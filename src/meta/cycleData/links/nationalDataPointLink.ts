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

export type NationalDataPointLinkLocation = LinkLocationBase & {
  sectionName: 'originalDataPoint'
  odpSection: NDPLinkField
  odpUuid: UUID
  // Set when the location is a data source reference location within the odp.
  dataSourceUuid?: UUID
  year: number
}

// The fields used to match stored locations.
export type NationalDataPointLinkLocationKey = Pick<
  NationalDataPointLinkLocation,
  'odpSection' | 'odpUuid' | 'sectionName'
>
