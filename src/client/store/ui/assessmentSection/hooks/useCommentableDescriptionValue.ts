import { CommentableDescriptionValue } from '@meta/assessment'

import { useSectionCycleState } from './index'

export default (props: {
  name: string
  sectionName: string
  template: CommentableDescriptionValue
}): CommentableDescriptionValue => {
  const { name, sectionName, template } = props
  const sectionCycleState = useSectionCycleState()
  return sectionCycleState.descriptions?.[sectionName]?.[name] ?? template
}
