import React from 'react'
import { useTranslation } from 'react-i18next'

import { Country } from 'meta/area'

import Select, { SelectProps } from 'client/components/Inputs/Select'

import { useCountriesByRegionOptions } from './hooks/useCountriesByRegionOptions'

type Props = Omit<SelectProps, 'options'> & {
  countries: Array<Country>
  excludedRegions: Array<string>
}

const CountryMultiSelect: React.FC<Props> = (props: Props) => {
  const { countries, excludedRegions, ...selectProps } = props
  const { multiLabelSummaryKey, placeholder } = selectProps

  const { t } = useTranslation()

  const optionGroups = useCountriesByRegionOptions({ countries, excludedRegions })

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...selectProps}
      multiLabelSummaryKey={multiLabelSummaryKey ?? 'admin.country'}
      options={optionGroups}
      placeholder={placeholder ?? t('common.countries')}
    />
  )
}

export default CountryMultiSelect
