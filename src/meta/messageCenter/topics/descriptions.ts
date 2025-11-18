import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  name: CommentableDescriptionName
  sectionName: SectionName
}

export const getCommentableDescriptionKey = (props: Props): string => {
  const { assessmentName, countryIso, cycleName, name, sectionName } = props

  return `commentable-description-${[countryIso, assessmentName, cycleName, sectionName, name].join('_')}`
}
