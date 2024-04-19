import { useMemo } from 'react'
import { OptionProps } from 'react-select'

import { ToggleAllOptions } from 'client/components/Inputs/Select/toggleAllOptions'
import { Option, OptionsGroup } from 'client/components/Inputs/Select/types'

type Props = OptionProps<Option>

type Returned = {
  checked: boolean
  isInputIndeterminate: boolean
  isSelectAllOption: boolean
}

export const useMultiSelectOptionConfig = (props: Props): Returned => {
  const { data, isSelected, options, selectProps } = props

  const isSelectAllOption = data.value === ToggleAllOptions.VALUE
  const allOptionsCount = useMemo<number>(() => {
    if (!isSelectAllOption) return 0
    return options.reduce((acc, optionOrGroup) => {
      if (Object.hasOwn(optionOrGroup, 'options')) {
        const group = optionOrGroup as OptionsGroup
        return acc + group.options.length
      }
      return acc + 1
    }, 0)
  }, [isSelectAllOption, options])

  return useMemo<Returned>(() => {
    const selectedValuesLength = Array.isArray(selectProps.value) ? selectProps.value.length : 0
    const allSelected = selectedValuesLength === allOptionsCount - 1
    const checked = isSelected || (isSelectAllOption && allSelected)

    const isInputIndeterminate = isSelectAllOption && !allSelected && selectedValuesLength > 0

    return { checked, isInputIndeterminate, isSelectAllOption }
  }, [allOptionsCount, isSelectAllOption, isSelected, selectProps.value])
}
