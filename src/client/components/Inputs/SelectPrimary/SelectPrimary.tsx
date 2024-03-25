import './SelectPrimary.scss'
import React from 'react'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import Select from 'client/components/Inputs/Select'
import { SelectProps } from 'client/components/Inputs/Select/types'

const SelectPrimary: React.FC<SelectProps> = (props) => {
  const { disabled, isClearable, isMulti, onChange, options, placeholder, value } = props

  return (
    <Select
      classNames={{ container: classNames('select-primary__container', { inverse: Objects.isEmpty(value) }) }}
      disabled={disabled}
      isClearable={isClearable}
      isMulti={isMulti}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default SelectPrimary
