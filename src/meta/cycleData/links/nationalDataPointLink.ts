import { LinkLocationBase } from 'meta/cycleData/links/linkLocationBase'
import { UUID } from 'meta/uuid/uuid'

export enum NDPLinkField {
  commentsExtentOfForest = 'comments_extentofforest',
  commentsForestCharacteristics = 'comments_forestcharacteristics',
  dataSourceReferences = 'data_source_references',
}

export type NDPLinkTarget = {
  odpUuid: UUID
  fields: Array<NDPLinkField>
  year: number
}

export type OriginalDataPointLocation = LinkLocationBase & {
  sectionName: 'originalDataPoint'
  odpSection: string
  odpUuid?: string
  year: number
}
