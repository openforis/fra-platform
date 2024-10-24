import { useCallback } from 'react'

import { ToggleAllOptions } from 'client/components/Inputs/Select/toggleAllOptions'
import { Option, OptionsGroup, SelectProps } from 'client/components/Inputs/Select/types'

type Returned = (option?: Option | Array<Option>) => void

export const useOnChange = (props: SelectProps): Returned => {
  const { isMulti, onChange, options: selectOptions, toggleAll } = props

  return useCallback<Returned>(
    (option?: Option | Array<Option>) => {
      if (isMulti && Array.isArray(option)) {
        const selectedValues = option.map(({ value }) => value)
        if (!toggleAll) return onChange(selectedValues)

        const includesSelectAll = selectedValues.includes(ToggleAllOptions.VALUE)
        // Update with only selected values (excluding "Select All")
        if (!includesSelectAll) return onChange(selectedValues)

        // If "(Un) Select All" is toggled while some items are selected, deselect all
        if (selectedValues.length > 1) return onChange([])

        // If "Select All" is toggled with no selection, select all original options
        if (selectedValues.length === 1) {
          const uniqueValues = new Set<string>()
          selectOptions.forEach((optionOrGroup) => {
            if (Object.hasOwn(optionOrGroup, 'options')) {
              ;(optionOrGroup as OptionsGroup).options.forEach(({ value }) => uniqueValues.add(value))
            } else {
              uniqueValues.add((optionOrGroup as Option).value)
            }
          })
          return onChange(Array.from(uniqueValues))
        }
      }
      // Handle Single-Select
      return onChange((option as Option)?.value ?? null)
    },
    [isMulti, onChange, selectOptions, toggleAll]
  )
}
