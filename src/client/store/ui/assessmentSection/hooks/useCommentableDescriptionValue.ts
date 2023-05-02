import { CommentableDescriptionValue } from '@meta/assessment'

import { useAppSelector } from '@client/store'

export default (props: {
  name: string
  sectionName: string
  template: CommentableDescriptionValue
}): CommentableDescriptionValue => {
  const { name, sectionName, template } = props
  return useAppSelector((state) => {
    return state.ui.assessmentSection.descriptions?.[sectionName]?.[name] ?? template
  })
}
