import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Country, CountryIso } from 'meta/area'

import { useCountries } from 'client/store/area/hooks/countries'
import { useRegionGroups } from 'client/store/area/hooks/regions'
import { useIsPanEuropeanRoute } from 'client/hooks'
import { Props as CountrySelectProps } from 'client/components/CountryMultiSelect/types'
import { Option, OptionsGroup } from 'client/components/Inputs/Select'

type Props = Pick<CountrySelectProps, 'allowedCountries'>

type Returned = Array<Option> | Array<OptionsGroup>

export const useCountriesByRegionOptions = (props: Props): Returned => {
  const { allowedCountries } = props
  const allCountries = useCountries()
  const isPanEuropean = useIsPanEuropeanRoute()

  const { t } = useTranslation()

  const regionGroups = useRegionGroups()

  const countries = useMemo<Array<Country>>(() => {
    if (Objects.isNil(allowedCountries)) return allCountries
    return allCountries.filter(({ countryIso }) => allowedCountries.includes(countryIso))
  }, [allCountries, allowedCountries])

  return useMemo<Returned>(() => {
    const getCountryOption = (countryIso: CountryIso): Option => {
      return {
        label: t(`area.${countryIso}.listName`),
        value: countryIso,
      }
    }

    if (isPanEuropean) {
      return countries.map(({ countryIso }) => getCountryOption(countryIso))
    }

    const orderOneRegionGroup = Object.values(regionGroups ?? {}).find((group) => group.order === 1)
    if (!orderOneRegionGroup) return []

    const regionCountriesMap = new Map<string, Array<Option>>()
    orderOneRegionGroup.regions.forEach(({ regionCode }) => {
      if (!regionCountriesMap.has(regionCode)) {
        regionCountriesMap.set(regionCode, [])
      }
    })

    countries.forEach(({ countryIso, regionCodes }) => {
      regionCodes.forEach((regionCode) => {
        if (!regionCountriesMap.has(regionCode)) return
        const countryOption = getCountryOption(countryIso)
        regionCountriesMap.get(regionCode).push(countryOption)
      })
    })

    return Array.from(regionCountriesMap.entries())
      .map(([regionCode, options]) => ({
        label: t(`area.${regionCode}.listName`),
        options,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [countries, isPanEuropean, regionGroups, t])
}
