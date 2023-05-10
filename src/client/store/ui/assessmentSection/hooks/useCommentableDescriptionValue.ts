import { CommentableDescriptionValue } from '@meta/assessment'

import { useAppSelector } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'

export default (props: {
  name: string
  sectionName: string
  template: CommentableDescriptionValue
}): CommentableDescriptionValue => {
  const { name, sectionName, template } = props
  const assessment = useAssessment()
  const cycle = useCycle()

  return useAppSelector((state) => {
    return (
      state.ui.assessmentSection?.[assessment.props.name]?.[cycle.name]?.descriptions?.[sectionName]?.[name] ?? template
    )
  })
}
