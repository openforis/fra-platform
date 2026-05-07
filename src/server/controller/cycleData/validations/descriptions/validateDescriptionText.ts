import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Validation } from 'meta/assessment/validation/validation'

type Props = {
  assessment: Assessment
  cycle: Cycle
  descriptionName: CommentableDescriptionName
  sectionName: SectionName
  value: CommentableDescriptionValue
}

export const validateDescriptionText = (props: Props): Validation | undefined => {
  const { value } = props

  // TODO: Validate description text links through the existing links validation workflow.
  void value

  return undefined
}
