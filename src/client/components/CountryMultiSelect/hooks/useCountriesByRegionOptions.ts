import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useCountries, useRegionGroups } from 'client/store/area'
import { useIsPanEuropeanRoute } from 'client/hooks'
import { Option, OptionsGroup } from 'client/components/Inputs/Select'

type Returned = Array<Option> | Array<OptionsGroup>

export const useCountriesByRegionOptions = (): Returned => {
  const countries = useCountries()
  const isPanEuropean = useIsPanEuropeanRoute()

  const { t } = useTranslation()

  const regionGroups = useRegionGroups()

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
