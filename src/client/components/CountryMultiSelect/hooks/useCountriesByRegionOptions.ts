import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Country } from 'meta/area'

import { Option, OptionsGroup } from 'client/components/Inputs/Select'

type Props = {
  countries: Array<Country>
  excludedRegions: Array<string>
}

type Returned = Array<OptionsGroup>

export const useCountriesByRegionOptions = (props: Props): Returned => {
  const { countries, excludedRegions } = props
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const regionCountriesMap = new Map<string, Array<Option>>()

    countries.forEach(({ countryIso, regionCodes }) => {
      regionCodes.forEach((regionCode) => {
        if (excludedRegions.includes(regionCode)) return

        if (!regionCountriesMap.has(regionCode)) {
          regionCountriesMap.set(regionCode, [])
        }
        const countryOption = {
          label: t(`area.${countryIso}.listName`),
          value: countryIso,
        }
        regionCountriesMap.get(regionCode).push(countryOption)
      })
    })

    return Array.from(regionCountriesMap.entries())
      .map(([regionCode, countryOptions]) => ({
        label: t(`area.${regionCode}.listName`),
        options: countryOptions.sort((a, b) => a.label.localeCompare(b.label)),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [countries, excludedRegions, t])
}
