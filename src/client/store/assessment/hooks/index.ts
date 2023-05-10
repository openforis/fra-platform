import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Strings } from '@utils/strings'

import { Country, CountryIso, RegionGroup } from '@meta/area'
import { Assessment, AssessmentName, AssessmentNames, Section, SubSection } from '@meta/assessment'

import { useAppSelector } from '@client/store'
import { useCountryIso } from '@client/hooks'

import { useCycle } from './useCycle'

export { useCycle }

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

export const useAssessment = (assessmentName?: AssessmentName): Assessment => {
  const assessmentNameDefault = AssessmentNames.fra
  const { assessmentName: _assessmentName } = useParams<{ assessmentName: string }>()
  return useAppSelector((state) => state.assessment?.[assessmentName ?? _assessmentName ?? assessmentNameDefault])
}

const _useCountries = (): Record<CountryIso, Country> => {
  const assessment = useAssessment()
  const cycle = useCycle()
  return useAppSelector((state) => state.assessment[assessment.props.name][cycle.name]?.countries ?? {})
}

export const useCountries = (): Array<Country> => {
  const countries = _useCountries()
  const { i18n } = useTranslation()
  const compareListName = getCompareListName(i18n)

  return Object.values(countries).sort((c1, c2) => compareListName(c1.countryIso, c2.countryIso))
}

export const useCountry = (countryIso: CountryIso): Country => {
  const countries = _useCountries()
  return countries[countryIso]
}

export const useAssessmentCountry = (): Country => {
  const countryIso = useCountryIso()
  if (!countryIso) throw new Error(`Unable to find countryIso parameter`)
  return useCountry(countryIso)
}

export const useRegionGroups = (): Record<string, RegionGroup> => {
  const assessment = useAssessment()
  const cycle = useCycle()
  return useAppSelector((state) => state.assessment[assessment.props.name][cycle.name]?.regionGroups ?? {})
}

export const useAssessmentSections = (): Array<Section> => {
  const assessment = useAssessment()
  const cycle = useCycle()
  return useAppSelector((state) => state.assessment[assessment.props.name][cycle.name]?.sections)
}

export const useAssessmentSection = (sectionNameParam?: string): SubSection => {
  const sections = useAssessmentSections()
  const { sectionName: s } = useParams<{ sectionName: string }>()
  // Prefer optional function param if passed over url param for sectionName
  const sectionName = sectionNameParam ?? s
  return sections
    ?.find((section) => section.subSections.find((subSection) => subSection.props.name === sectionName))
    .subSections.find((subSection) => subSection.props.name === sectionName)
}

export const useSecondaryRegion = () => {
  const regionGroups = useRegionGroups()
  return Object.fromEntries(Object.entries(regionGroups).filter(([_, value]) => value.name === 'secondary'))['1']
}

export const useIsAppInitialized = () => useAppSelector((state) => state.assessment.appInitialized)
