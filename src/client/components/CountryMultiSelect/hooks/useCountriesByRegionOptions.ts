import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Areas, Country, CountryIso } from 'meta/area'

import { useCountries } from 'client/store/area/hooks/countries'
import { useRegionGroups } from 'client/store/area/hooks/regions'
import { useIsPanEuropeanRoute } from 'client/hooks'
import { Props as CountrySelectProps } from 'client/components/CountryMultiSelect/types'
import { Option, OptionsGroup } from 'client/components/Inputs/Select'

type Props = Pick<CountrySelectProps, 'allowedCountries' | 'allowAtlantis' | 'disabledOptions'>

type Returned = Array<Option> | Array<OptionsGroup>

export const useCountriesByRegionOptions = (props: Props): Returned => {
  const { allowAtlantis, allowedCountries, disabledOptions } = props
  const allCountries = useCountries()
  const isPanEuropean = useIsPanEuropeanRoute()

  const { t } = useTranslation()

  const regionGroups = useRegionGroups()

  const countries = useMemo<Array<Country>>(() => {
    return allCountries.filter(({ countryIso }) => {
      const includeAtlantis = allowAtlantis || !Areas.isAtlantis(countryIso)
      const includeAllowedCountries = Objects.isNil(allowedCountries) || allowedCountries.includes(countryIso)
      return includeAtlantis && includeAllowedCountries
    })
  }, [allCountries, allowAtlantis, allowedCountries])

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
      .map(([regionCode, options]) => {
        const allChildrenDisabled = options.every((option) => disabledOptions?.includes(option.value))

        return {
          label: t(`area.${regionCode}.listName`),
          options,
          disabled: allChildrenDisabled,
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [countries, disabledOptions, isPanEuropean, regionGroups, t])
}
