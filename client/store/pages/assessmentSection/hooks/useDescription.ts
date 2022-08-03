import { useAppSelector } from '@client/store'

export default (name: string, section: string, template: string): string => {
  return useAppSelector((state) => {
    return state.pages.assessmentSection.descriptions?.[section]?.[name] ?? template
  })
}
