import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Validation } from 'meta/assessment/validation/validation'

import { DescriptionValidators } from './validators'

type Props = {
  assessment: Assessment
  cycle: Cycle
  descriptionName: CommentableDescriptionName
  sectionName: SectionName
  value: CommentableDescriptionValue
}

export const validateDescription = (props: Props): Validation | undefined => {
  const { value } = props

  return DescriptionValidators.links(value.text)
}
