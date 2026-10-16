import { hasSectionOnlyComments } from 'meta/assessment/descriptions/hasSectionOnlyComments'
import { DescriptionVisibilityProps } from 'meta/assessment/descriptions/types'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

// Descriptions that remain visible when a section shows only comments
const commentDescriptionNames = [
  CommentableDescriptionName.generalComments,
  CommentableDescriptionName.introductoryText,
]

export const getVisibleDescriptionNames = (props: DescriptionVisibilityProps): Array<CommentableDescriptionName> => {
  if (hasSectionOnlyComments(props)) return commentDescriptionNames
  return Object.values(CommentableDescriptionName)
}
