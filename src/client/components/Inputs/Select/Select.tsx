import './Select.scss'
import React from 'react'
import ReactSelect from 'react-select'

import { useClassNames } from './hooks/useClassNames'
import { useComponents } from './hooks/useComponents'
import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'
import { useValue } from './hooks/useValue'
import { SelectProps } from './types'

const Select: React.FC<SelectProps> = (props) => {
  const { disabled, isClearable, isMulti, maxMenuHeight, placeholder } = props

  const classNames = useClassNames(props)
  const components = useComponents(props)
  const onChange = useOnChange(props)
  const options = useOptions(props)
  const value = useValue(props)

  return (
    <ReactSelect
      classNames={classNames}
      closeMenuOnSelect={!isMulti}
      components={components}
      hideSelectedOptions={false}
      isClearable={isClearable}
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable
      maxMenuHeight={maxMenuHeight}
      menuPlacement="auto"
      menuPosition="fixed"
      onChange={onChange}
      options={options}
      placeholder={placeholder ?? ''}
      value={value}
    />
  )
}

Select.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  isClearable: true,
}

export default Select
