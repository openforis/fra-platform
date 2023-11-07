import './Select.scss'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import RSelect from 'react-select'

import { Labels } from 'meta/assessment'

import { Option } from './types'

type Props = {
  value: string
  onChange: (newValue: string) => void
  disabled: boolean
  options: Array<Option>
}

type TranslatedOption = {
  label: string
  value: string
}

type TranslatedOptions = Array<TranslatedOption>

const Select: React.FC<Props> = (props) => {
  const { value, onChange, disabled, options: _options } = props
  const { t } = useTranslation()

  const options: TranslatedOptions = useMemo(
    () =>
      _options.map(
        (item: Option): TranslatedOption => ({
          ...item,
          label: Labels.getLabel({ label: item.label, t }),
        })
      ),
    [_options, t]
  )

  const defaultValue = useMemo(() => {
    return options.find((item) => {
      return item.value === value
    })
  }, [options, value])

  const _onChange = useCallback(
    (option: TranslatedOption) => {
      onChange(option?.value ?? null)
    },
    [onChange]
  )

  return (
    <RSelect
      classNamePrefix="fra-select"
      defaultValue={defaultValue}
      isClearable
      isDisabled={disabled}
      isSearchable={false}
      onChange={_onChange}
      options={options}
    />
  )
}

export default Select
