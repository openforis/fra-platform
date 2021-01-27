// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Area } from '@common/country'

export const sortCountries = (countries: any, i18n: any) => {
  const compareListName = Area.getCompareListName(i18n)
  const compareCountries = (country1: any, country2: any) => compareListName(country1.countryIso, country2.countryIso)
  return [...countries].sort(compareCountries)
}

export const sortRegions = (regions: any, i18n: any) => {
  const compareListName = Area.getCompareListName(i18n)
  return [...regions].sort((r1, r2) => compareListName(r1.regionCode, r2.regionCode))
}

export const sortRegionGroups = (regionGroups: any) => {
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'number'.
  return [...regionGroups].sort((rg1, rg2) => rg1.order > rg2.order)
}
