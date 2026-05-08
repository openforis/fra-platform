import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Htmls } from 'utils/htmls'
import { Objects } from 'utils/objects'

type Props = {
  assessment: Assessment
  cycle: Cycle
  descriptionName: CommentableDescriptionName
  sectionName: SectionName
  value: CommentableDescriptionValue
}

export const updateDescriptionTextValidations = (props: Props): void => {
  const { value } = props

  const links = Htmls.getLinks(value.text)
  if (Objects.isEmpty(links)) return

  // TODO: Schedule description links validation worker.
}
