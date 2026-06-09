import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'

import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import { useCountriesByRegionOptions } from 'client/components/CountryMultiSelect/hooks/useCountriesByRegionOptions'
import { PropsTooltipCountries } from 'client/components/CountryMultiSelect/TooltipCountries/types'
import { OptionsGroup } from 'client/components/Inputs/Select'

type RegionGroup = {
  countries: Array<string>
  label: string
}

type Returned = Array<RegionGroup>

export const useRegionGroups = (props: PropsTooltipCountries): Returned => {
  const { allowAtlantis, allowedCountries, value } = props

  const { t } = useTranslation()
  const isPanEuropean = useIsPanEuropeanRoute()
  const countryOptionGroups = useCountriesByRegionOptions({ allowAtlantis, allowedCountries })

  return useMemo<Returned>(() => {
    if (isPanEuropean) {
      const valueArray = Array.isArray(value) ? value : [value]
      const countries = valueArray
        .map((countryIso) => t(`area.${countryIso}.listName`))
        .sort((a, b) => a.localeCompare(b))
      return [{ label: '', countries }]
    }

    return countryOptionGroups.reduce<Returned>((acc, regionGroup) => {
      const regionCountries = (regionGroup as OptionsGroup).options.reduce<Array<string>>((accCountries, option) => {
        const countryIso = option.value as CountryIso
        if (value.includes(countryIso)) {
          accCountries.push(t(`area.${countryIso}.listName`))
        }
        return accCountries
      }, [])

      if (regionCountries.length > 0) {
        acc.push({ label: String(regionGroup.label), countries: regionCountries.sort((a, b) => a.localeCompare(b)) })
      }
      return acc
    }, [])
  }, [countryOptionGroups, isPanEuropean, t, value])
}
