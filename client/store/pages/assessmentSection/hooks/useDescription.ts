import { useAppSelector } from '@client/store'

export default (props: { name: string; sectionName: string; template: string }): string => {
  const { name, sectionName, template } = props
  return useAppSelector((state) => {
    return state.pages.assessmentSection.descriptions?.[sectionName]?.[name] ?? template
  })
}
