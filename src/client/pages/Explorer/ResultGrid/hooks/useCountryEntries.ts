import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas, CountryIso } from 'meta/area'

import { useExplorerCountries } from 'client/store/explorer/selection/hooks/countries'

type Returned = Array<{ countryIso: CountryIso; label: string }>

export const useCountryEntries = (): Returned => {
  const { t } = useTranslation()

  const explorerCountryIsos = useExplorerCountries()

  return useMemo<Returned>(
    () =>
      (explorerCountryIsos ?? [])
        .map((countryIso) => ({
          countryIso,
          label: t(Areas.getTranslationKey(countryIso)),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [explorerCountryIsos, t]
  )
}
