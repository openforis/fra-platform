import { useCallback, useMemo } from 'react'
import { GroupHeadingProps, MultiValue } from 'react-select'

import { Option } from 'client/components/Inputs/Select/types'

type Props = GroupHeadingProps<Option, true>

type Returned = {
  handleGroupSelectionToggle: () => void
}

export const useGroupSelection = (props: Props): Returned => {
  const { data, selectProps } = props
  const { isOptionDisabled, onChange, value } = selectProps

  const dataOptions = isOptionDisabled ? data.options.filter((option) => !isOptionDisabled(option, null)) : data.options
  const groupValues = useMemo<Array<string>>(() => dataOptions.map((option) => option.value), [dataOptions])

  const handleGroupSelectionToggle = useCallback(() => {
    const selectedOptions = value === null ? [] : (value as MultiValue<Option>)

    const selectedValues = selectedOptions.map((option) => option.value)

    const selectedInGroupCount = groupValues.filter((val) => selectedValues.includes(val)).length

    if (selectedInGroupCount === 0 && selectedInGroupCount !== dataOptions.length) {
      const newSelectedOptions = [...selectedOptions, ...dataOptions]
      onChange?.(newSelectedOptions, { action: 'select-option', option: undefined })
    } else {
      // Unselect group options
      const remainingSelectedOptions = selectedOptions.filter((option) => !groupValues.includes(option.value))
      onChange?.(remainingSelectedOptions, { action: 'deselect-option', option: undefined })
    }
  }, [dataOptions, groupValues, onChange, value])

  return { handleGroupSelectionToggle }
}
