import './SelectableGroupHeading.scss'
import React, { useEffect, useRef } from 'react'
import { GroupHeadingProps } from 'react-select'

import classNames from 'classnames'

import { Option, OptionsGroup } from 'client/components/Inputs/Select/types'

import { useGroupSelection } from './hooks/useGroupSelection'
import { useSelectableGroupConfig } from './hooks/useSelectableGroupConfig'

export const SelectableGroupHeading: React.FC<GroupHeadingProps<Option, true, OptionsGroup>> = (props) => {
  const { children, data } = props

  const { checked, isInputIndeterminate } = useSelectableGroupConfig(props)
  const { handleGroupSelectionToggle } = useGroupSelection(props)
  const { disabled } = data

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isInputIndeterminate
    }
  }, [isInputIndeterminate])

  return (
    <div className={classNames('select__groupHeading', 'select__groupHeading-selectable', { disabled })}>
      <input
        ref={inputRef}
        checked={checked}
        className="select__toggleAllOption-checkbox"
        disabled={disabled}
        onChange={() => undefined}
        onClick={handleGroupSelectionToggle}
        type="checkbox"
      />
      {children}
    </div>
  )
}

export default SelectableGroupHeading
