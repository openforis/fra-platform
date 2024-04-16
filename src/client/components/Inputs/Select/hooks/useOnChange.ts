import { useCallback } from 'react'

import { Option, OptionsGroup, selectAllOptionValue, SelectProps } from 'client/components/Inputs/Select/types'

type Returned = (option?: Option | Array<Option>) => void

export const useOnChange = (props: SelectProps): Returned => {
  const { isMulti, onChange, options: selectOptions, toggleAll } = props

  return useCallback<Returned>(
    (option?: Option | Array<Option>) => {
      if (isMulti && Array.isArray(option)) {
        const selectedValues = option.map(({ value }) => value)
        if (!toggleAll) return onChange(selectedValues)

        const includesSelectAll = selectedValues.includes(selectAllOptionValue)
        // Update with only selected values (excluding "Select All")
        if (!includesSelectAll) return onChange(selectedValues)

        // If "(Un) Select All" is toggled while some items are selected, deselect all
        if (includesSelectAll && selectedValues.length > 1) return onChange([])

        // If "Select All" is toggled with no selection, select all original options
        if (includesSelectAll && selectedValues.length === 1) {
          const allValues = selectOptions.flatMap((optionOrGroup) => {
            if (Object.hasOwn(optionOrGroup, 'options')) {
              return (optionOrGroup as OptionsGroup).options.map(({ value }) => value)
            }
            return (optionOrGroup as Option).value
          })
          return onChange(allValues)
        }
      }
      // Handle Single-Select
      return onChange((option as Option)?.value ?? null)
    },
    [isMulti, onChange, selectOptions, toggleAll]
  )
}
