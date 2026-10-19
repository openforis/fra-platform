import { AreaCode } from 'meta/area/areaCode'
import { Country } from 'meta/area/country'
import { CountryIso, countryISOs } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'
import { fraRegionCodes } from 'meta/area/fraRegionCodes'
import { Global } from 'meta/area/global'
import { Region } from 'meta/area/region'
import { RegionCode } from 'meta/area/regionCode'
import { SubregionCode } from 'meta/area/subregionCode'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Lang } from 'meta/lang'
import { Dates } from 'utils/dates'

const subregionCodes = Object.values(SubregionCode)
const regionCodes = Object.values(RegionCode)

const getCountryBackgroundImg = (isoCode: AreaCode): string =>
  isoCode.startsWith('X')
    ? `url('/img/flags/ATL.svg')`
    : `url('https://www.fao.org/images/corporatelibraries/flags/${isoCode.toLowerCase()}.svg')`

const getTranslationKey = (isoCode: AreaCode): string => `area.${isoCode}.listName`

const isAtlantis = (countryIso: CountryIso | RegionCode): boolean =>
  countryIso.startsWith('X') || countryIso === RegionCode.AT
const isGlobal = (isoCode: CountryIso | RegionCode | Global): boolean => Global.WO === isoCode
const isSubregion = (isoCode: string): boolean => subregionCodes.includes(isoCode as SubregionCode)
const isISOCountry = (isoCode: string): boolean => (countryISOs as ReadonlyArray<string>).includes(isoCode)
const isISOGlobal = (isoCode: string): boolean => isoCode === Global.WO
const isRegion = (isoCode: string): boolean => regionCodes.includes(isoCode as RegionCode)
const isFRARegion = (isoCode: string): boolean => fraRegionCodes.includes(isoCode as RegionCode)
const getStatus = (country: Country): CountryStatus => {
  const { status } = country?.props ?? {}

  return status
}

const _getSortIndex = (area: Country | Region, lang: Lang): number => {
  const { sortIndex } = area
  const langValue = sortIndex?.[lang]
  if (langValue !== undefined) return langValue

  const fallbackValue = sortIndex?.[Lang.en]
  if (fallbackValue !== undefined) return fallbackValue

  return Number.MAX_SAFE_INTEGER
}

const getCompareListName = <T extends Country | Region>(area1: T, area2: T, lang: Lang): number => {
  return _getSortIndex(area1, lang) - _getSortIndex(area2, lang)
}

const hasVoluntaryUpdates = (props: { assessment: Assessment; country: Country }): boolean => {
  const { assessment, country } = props
  const cycle = Assessments.getLastPublishedCycle(assessment)

  if (!country?.lastPublishedInfo?.lastPublished || !cycle.props.datePublished) {
    return false
  }

  const cycleCountryLastPublished = Assessments.getCycle({ assessment, cycleUuid: country.lastPublishedInfo.cycleUuid })

  return Dates.isAfter(
    Dates.parseISO(cycleCountryLastPublished.props.dateCreated),
    Dates.parseISO(cycle.props.dateCreated)
  )
}

export const Areas = {
  getCompareListName,
  getCountryBackgroundImg,
  getStatus,
  getTranslationKey,
  hasVoluntaryUpdates,
  isAtlantis,
  isFRARegion,
  isGlobal,
  isISOCountry,
  isISOGlobal,
  isRegion,
  isSubregion,
}
