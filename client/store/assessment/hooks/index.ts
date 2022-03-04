import { useAppSelector } from '@client/store'
import { Assessment, Section, CountryStatus, SubSection } from '@meta/assessment'
import { CountryIso, RegionGroup } from '@meta/area'

import { useTranslation } from 'react-i18next'
import { Strings } from '@core/utils'
import { useParams } from 'react-router-dom'

export { useCycle } from './useCycle'

// TODO: Move elsewhere <>
const getLocale = (isoCode: string): string => {
  if (isoCode.includes('zh')) return 'zh-CN'
  return isoCode
}
const getListName = (isoCode: string, i18n: any): string => i18n.t(`area.${isoCode}.listName`)

type CompareFn = (isoCode1: string, isoCode2: string) => number
const getCompareListName =
  (i18n: any): CompareFn =>
  (isoCode1: string, isoCode2: string): number => {
    const country1 = Strings.normalize(getListName(isoCode1, i18n))
    const country2 = Strings.normalize(getListName(isoCode2, i18n))
    const locale = getLocale(i18n.language)
    return country1.localeCompare(country2, locale)
  }

// </>

const sortCountries = (countries: Array<CountryIso>): Array<CountryIso> => {
  const { i18n } = useTranslation()
  const compareListName = getCompareListName(i18n)

  return [...countries].sort((c1, c2) => compareListName(c1, c2))
}

export const useAssessment = (): Assessment => useAppSelector((state) => state.assessment?.assessment)
export const useCountries = (): Array<CountryIso> =>
  sortCountries(useAppSelector((state) => state.assessment?.countryISOs ?? []))

export const useRegionGroups = (): Record<string, RegionGroup> =>
  useAppSelector((state) => state.assessment?.regionGroups ?? {})

export const useAssessmentSections = (): Array<Section> => useAppSelector((state) => state.assessment.sections)
export const useAssessmentSection = (): SubSection => {
  const sections = useAssessmentSections()
  const { section: sectionName } = useParams<{ section: string }>()
  return sections
    ?.find((section) => section.subSections.find((subSection) => subSection.props.name === sectionName))
    .subSections.find((subSection) => subSection.props.name === sectionName)
}

export const useAssessmentCountryStatus = (): CountryStatus => useAppSelector((state) => state.assessment.countryStatus)
