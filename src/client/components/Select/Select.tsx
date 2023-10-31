import './Select.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import RSelect from 'react-select'

import { Option } from './types'

type Props = {
  value: string
  onChange: (newValue: Option) => void
  disabled: boolean
  options: Array<Option>
}

const Select: React.FC<Props> = (props) => {
  const { value, onChange, disabled, options: _options } = props
  const { t } = useTranslation()

  const options = _options.map(
    (item): Option => ({
      ...item,
      label: t(item.label),
    })
  )

  const defaultValue = useMemo(() => {
    return options.find((item) => {
      return item.value === value
    })
  }, [options, value])

  return (
    <RSelect
      isClearable
      classNamePrefix="fra-select"
      defaultValue={defaultValue}
      isDisabled={disabled}
      onChange={onChange}
      options={options}
    />
  )
}

export default Select
