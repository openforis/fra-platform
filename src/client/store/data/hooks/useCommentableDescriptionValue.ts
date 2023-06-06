import { CommentableDescriptionValue } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'

export const useCommentableDescriptionValue = (props: {
  name: string
  sectionName: string
  template: CommentableDescriptionValue
}): CommentableDescriptionValue => {
  const { name, sectionName, template } = props
  const assessment = useAssessment()
  const cycle = useCycle()
  return useAppSelector(
    (state) => state.data[assessment.props.name][cycle.name].descriptions[sectionName]?.[name] ?? template
  )
}
