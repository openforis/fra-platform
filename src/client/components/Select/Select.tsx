import './Select.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import RSelect from 'react-select'

import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

import { Option } from './types'

type Props = {
  value: string
  onChange: (newValue: Option) => void
  disabled: boolean
  column: ColumnNodeExt
}

const Select: React.FC<Props> = (props) => {
  const { value, onChange, disabled, column } = props
  const { options: _options } = column.props
  const { t } = useTranslation()

  const options = useMemo(
    () =>
      _options.map(
        (item: Option): Option => ({
          ...item,
          label: t(item.label),
        })
      ),
    [_options, t]
  )

  const defaultValue = useMemo(() => {
    return options.find((item: Option) => {
      return item.value === value
    })
  }, [options, value])

  return (
    <RSelect
      classNamePrefix="fra-select"
      defaultValue={defaultValue}
      isClearable
      isDisabled={disabled}
      isSearchable={false}
      onChange={onChange}
      options={options}
    />
  )
}

export default Select
