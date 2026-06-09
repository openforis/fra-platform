import './Select.scss'
import React from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import classNamesFn from 'classnames'

import { useClassNames } from './hooks/useClassNames'
import { useComponents } from './hooks/useComponents'
import { useFormatCreateLabel } from './hooks/useFormatCreateLabel'
import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'
import { useValue } from './hooks/useValue'
import { SelectProps } from './types'

const Select: React.FC<SelectProps> = (props) => {
  const {
    bordered,
    createOptionPosition,
    disabled,
    formatOptionLabel,
    id,
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
    size,
    tooltip,
  } = props

  const classNames = useClassNames(props)
  const components = useComponents(props)
  const onChange = useOnChange(props)
  const options = useOptions(props)
  const value = useValue(props)
  const formatCreateLabel = useFormatCreateLabel(props)

  const selectProps: ReactSelectProps = {
    classNames,
    closeMenuOnSelect: !isMulti,
    components,
    formatOptionLabel,
    hideSelectedOptions: false,
    inputValue,
    isClearable,
    isDisabled: disabled,
    isMulti,
    isOptionDisabled,
    isSearchable: true,
    maxMenuHeight,
    menuPlacement: 'auto',
    menuPosition: 'fixed',
    onBlur,
    onChange,
    onFocus,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    options,
    placeholder: placeholder ?? '',
    value,
  }

  if (id) {
    selectProps.id = `select-${id}`
    selectProps.inputId = `select-input-${id}`
  }

  return (
    <div
      className={classNamesFn('select__wrapper', { bordered }, `size-${size}`)}
      data-tooltip-content={tooltip?.content}
      data-tooltip-id={tooltip?.id}
      data-tooltip-place={tooltip?.place}
      onPaste={onPaste}
    >
      {isCreatable && (
        <CreatableSelect
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...selectProps}
          createOptionPosition={createOptionPosition}
          formatCreateLabel={formatCreateLabel}
          isValidNewOption={isValidNewOption}
          onCreateOption={onCreateOption}
        />
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {!isCreatable && <ReactSelect {...selectProps} />}
    </div>
  )
}

export default Select
