import './Select.scss'
import React from 'react'
import ReactSelect from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { useClassNames } from './hooks/useClassNames'
import { useComponents } from './hooks/useComponents'
import { useFormatCreateLabel } from './hooks/useFormatCreateLabel'
import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'
import { useValue } from './hooks/useValue'
import { SelectProps } from './types'

const Select: React.FC<SelectProps> = (props) => {
  const {
    disabled,
    inputValue,
    isClearable,
    isCreatable,
    isMulti,
    maxMenuHeight,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    placeholder,
  } = props

  const classNames = useClassNames(props)
  const components = useComponents(props)
  const onChange = useOnChange(props)
  const options = useOptions(props)
  const value = useValue(props)
  const formatCreateLabel = useFormatCreateLabel(props)

  const Component = isCreatable ? CreatableSelect : ReactSelect

  return (
    <Component
      classNames={classNames}
      closeMenuOnSelect={!isMulti}
      components={components}
      formatCreateLabel={formatCreateLabel}
      hideSelectedOptions={false}
      inputValue={inputValue}
      isClearable={isClearable}
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable
      maxMenuHeight={maxMenuHeight}
      menuPlacement="auto"
      menuPosition="fixed"
      onChange={onChange}
      onInputChange={onInputChange}
      onMenuClose={onMenuClose}
      onMenuOpen={onMenuOpen}
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
