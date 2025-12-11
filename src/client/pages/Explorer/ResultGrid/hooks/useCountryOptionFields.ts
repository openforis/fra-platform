import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useExplorerCountryOptions } from 'client/store/explorer/selection/hooks/options'
import { CountryOptionField } from 'client/pages/Explorer/ResultGrid/types'

import { useCountryOptionsEnabled } from './useCountryOptionsEnabled'

type Returned = Array<CountryOptionField>

export const useCountryOptionFields = (): Returned => {
  const { t } = useTranslation()
  const options = useExplorerCountryOptions()
  const enabled = useCountryOptionsEnabled()

  return useMemo<Returned>(() => {
    if (!enabled) return []

    const fields: Returned = []

    if (options.showIso3) {
      fields.push({
        getValue: (country) => country.countryIso ?? '',
        key: 'iso3',
        label: t('common.iso3Code'),
      })
    }
    if (options.showIso2) {
      fields.push({
        getValue: (country) => country.countryIso2 ?? '',
        key: 'iso2',
        label: t('common.iso2Code'),
      })
    }
    if (options.showM49) {
      fields.push({
        getValue: (country) => country.m49 ?? '',
        key: 'm49',
        label: t('common.m49Code'),
      })
    }
    if (options.showDeskStudy) {
      fields.push({
        getValue: (country) => t(`yesNoTextSelect.${country.props?.deskStudy ? 'yes' : 'no'}`),
        key: 'deskStudy',
        label: t('assessment.deskStudy'),
      })
    }

    return fields
  }, [enabled, options, t])
}
