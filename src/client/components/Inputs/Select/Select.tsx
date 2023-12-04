import './Select.scss'
import React, { useCallback } from 'react'
import RSelect from 'react-select'

import { useValues } from './hooks/useValues'
import { Props } from './props'
import { TranslatedOption } from './types'

const Select: React.FC<Props> = (props) => {
  const { value, onChange, disabled, options: _options } = props
  const { defaultValue, options } = useValues({ options: _options, value })

  const _onChange = useCallback(
    (option: TranslatedOption) => {
      onChange(option?.value ?? null)
    },
    [onChange]
  )

  return (
    <RSelect
      components={{
        IndicatorSeparator: null,
      }}
      classNamePrefix="select"
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
