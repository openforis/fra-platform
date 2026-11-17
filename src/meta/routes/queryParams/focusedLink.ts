import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { NDPLinkField } from 'meta/cycleData/links/nationalDataPointLink'
import { UUID } from 'meta/uuid/uuid'

export type FocusedLinkQueryParams = {
  dataSourceUuid?: UUID
  descriptionName?: CommentableDescriptionName
  focusedLink?: string
  ndpSection?: NDPLinkField
}
