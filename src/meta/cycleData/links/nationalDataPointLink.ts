import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { LinkLocationBase } from 'meta/cycleData/links/linkLocationBase'
import { UUID } from 'meta/uuid/uuid'

export enum NDPLinkField {
  commentsExtentOfForest = 'comments_extentofforest',
  commentsForestCharacteristics = 'comments_forestcharacteristics',
  dataSourceReferences = 'data_source_references',
}

export const NDPLinkFields: Array<NDPLinkField> = Object.values(NDPLinkField)

export type NDPCommentLinkField = {
  commentKey: OriginalDataPointCommentKey
  linkField: NDPLinkField.commentsExtentOfForest | NDPLinkField.commentsForestCharacteristics
  sectionName: SectionNames.extentOfForest | SectionNames.forestCharacteristics
}

export const NDPCommentLinkFields: Array<NDPCommentLinkField> = [
  {
    commentKey: TableNames.extentOfForest,
    linkField: NDPLinkField.commentsExtentOfForest,
    sectionName: SectionNames.extentOfForest,
  },
  {
    commentKey: TableNames.forestCharacteristics,
    linkField: NDPLinkField.commentsForestCharacteristics,
    sectionName: SectionNames.forestCharacteristics,
  },
]

export type NDPLinkTarget = {
  ndpUuid: UUID
  fields: Array<NDPLinkField>
}

export type NationalDataPointLinkLocation = LinkLocationBase & {
  sectionName: 'originalDataPoint'
  ndpSection: NDPLinkField
  ndpUuid: UUID
  // Set when the location is a data source reference location within the odp.
  dataSourceUuid?: UUID
  year: number
}

// The fields used to match stored locations.
export type NationalDataPointLinkLocationKey = Pick<
  NationalDataPointLinkLocation,
  'ndpSection' | 'ndpUuid' | 'sectionName'
>
