import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'

import { useCountriesRecord } from 'client/store/area/hooks/countries'
import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'

type Returned = Array<Country & { label: string }>

export const useCountryEntries = (): Returned => {
  const { t } = useTranslation()

  const countries = useCountriesRecord()
  const explorerCountryIsos = useExplorerCountries()

  return useMemo<Returned>(
    () =>
      (explorerCountryIsos ?? [])
        .map((countryIso) => ({
          ...countries[countryIso],
          label: t(Areas.getTranslationKey(countryIso)),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [countries, explorerCountryIsos, t]
  )
}
