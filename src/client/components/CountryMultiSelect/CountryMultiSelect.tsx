import React from 'react'
import { useTranslation } from 'react-i18next'

import Select, { SelectProps } from 'client/components/Inputs/Select'

import { useCountriesByRegionOptions } from './hooks/useCountriesByRegionOptions'

type Props = Omit<SelectProps, 'options'>

const CountryMultiSelect: React.FC<Props> = (props: Props) => {
  const { multiLabelSummaryKey, placeholder } = props

  const { t } = useTranslation()

  const optionGroups = useCountriesByRegionOptions()

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      multiLabelSummaryKey={multiLabelSummaryKey ?? 'admin.country'}
      options={optionGroups}
      placeholder={placeholder ?? t('common.countries')}
    />
  )
}

export default CountryMultiSelect
