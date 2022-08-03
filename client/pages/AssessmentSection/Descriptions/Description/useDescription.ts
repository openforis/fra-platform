import { useAppSelector } from '@client/store'
import { useCountryIso } from '@client/hooks'

export default (name: string, section: string, template: string): string => {
  const countryIso = useCountryIso()
  return useAppSelector((state) => {
    return (
      state.pages.assessmentSection.descriptions.find(
        (description) =>
          description.countryIso === countryIso && description.sectionName === section && description.name === name
      )?.content ?? template
    )
  })
}
