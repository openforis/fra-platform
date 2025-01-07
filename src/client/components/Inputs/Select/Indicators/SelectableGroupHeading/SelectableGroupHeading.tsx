import './SelectableGroupHeading.scss'
import React, { useEffect, useRef } from 'react'
import { GroupHeadingProps } from 'react-select'

import { Option } from 'client/components/Inputs/Select/types'

import { useGroupSelection } from './hooks/useGroupSelection'
import { useSelectableGroupConfig } from './hooks/useSelectableGroupConfig'

export const SelectableGroupHeading: React.FC<GroupHeadingProps<Option, true>> = (
  props: GroupHeadingProps<Option, true>
) => {
  const { children } = props

  const { checked, isInputIndeterminate } = useSelectableGroupConfig(props)
  const { handleGroupSelectionToggle } = useGroupSelection(props)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isInputIndeterminate
    }
  }, [isInputIndeterminate])

  return (
    <div className="select__groupHeading select__groupHeading-selectable">
      <input
        ref={inputRef}
        checked={checked}
        className="select__toggleAllOption-checkbox"
        onChange={() => undefined}
        onClick={handleGroupSelectionToggle}
        type="checkbox"
      />
      {children}
    </div>
  )
}

export default SelectableGroupHeading
