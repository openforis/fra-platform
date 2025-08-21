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
    createOptionPosition,
    disabled,
    formatOptionLabel,
    inputValue,
    isClearable = true,
    isCreatable,
    isMulti,
    isOptionDisabled,
    isValidNewOption,
    maxMenuHeight,
    onBlur,
    onCreateOption,
    onFocus,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    onPaste,
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
    <div className="select__wrapper" onPaste={onPaste}>
      <Component
        classNames={classNames}
        closeMenuOnSelect={!isMulti}
        components={components}
        createOptionPosition={createOptionPosition}
        formatCreateLabel={formatCreateLabel}
        formatOptionLabel={formatOptionLabel}
        hideSelectedOptions={false}
        inputValue={inputValue}
        isClearable={isClearable}
        isDisabled={disabled}
        isMulti={isMulti}
        isOptionDisabled={isOptionDisabled}
        isSearchable
        isValidNewOption={isValidNewOption}
        maxMenuHeight={maxMenuHeight}
        menuPlacement="auto"
        menuPosition="fixed"
        onBlur={onBlur}
        onChange={onChange}
        onCreateOption={onCreateOption}
        onFocus={onFocus}
        onInputChange={onInputChange}
        onMenuClose={onMenuClose}
        onMenuOpen={onMenuOpen}
        options={options}
        placeholder={placeholder ?? ''}
        value={value}
      />
    </div>
  )
}

export default Select
