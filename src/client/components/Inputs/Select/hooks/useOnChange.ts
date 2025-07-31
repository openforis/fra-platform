import { useCallback } from 'react'
import { ActionMeta } from 'react-select'

import { ToggleAllOptions } from 'client/components/Inputs/Select/toggleAllOptions'
import { Option, OptionsGroup, SelectProps } from 'client/components/Inputs/Select/types'

type Returned = (option?: Option | Array<Option>, actionMeta?: ActionMeta<Option>) => void

export const useOnChange = (props: SelectProps): Returned => {
  const { isMulti, isOptionDisabled, onChange, options: selectOptions, toggleAll } = props

  return useCallback<Returned>(
    (option?: Option | Array<Option>, actionMeta?: ActionMeta<Option>) => {
      if (isMulti && Array.isArray(option)) {
        const selectedValues = option.map(({ value }) => value)
        if (!toggleAll) return onChange(selectedValues, actionMeta!)

        const includesSelectAll = selectedValues.includes(ToggleAllOptions.VALUE)
        // Update with only selected values (excluding "Select All")
        if (!includesSelectAll) return onChange(selectedValues, actionMeta!)

        // If "(Un) Select All" is toggled while some items are selected, deselect all
        if (selectedValues.length > 1) return onChange([], actionMeta!)

        // If "Select All" is toggled with no selection, select all original options
        if (selectedValues.length === 1) {
          const allOptions = selectOptions.flatMap<Option>((optionOrGroup) => {
            if (Object.hasOwn(optionOrGroup, 'options')) {
              return (optionOrGroup as OptionsGroup).options // .map(({ value }) => value)
            }
            return optionOrGroup as Option // .value
          })
          const allValues = allOptions.reduce<Array<Option['value']>>((agg, option) => {
            if (!isOptionDisabled || !isOptionDisabled(option, null)) {
              agg.push(option.value)
            }
            return agg
          }, [])

          return onChange(allValues, actionMeta!)
        }
      }
      // Handle Single-Select
      return onChange((option as Option)?.value ?? null, actionMeta!)
    },
    [isMulti, isOptionDisabled, onChange, selectOptions, toggleAll]
  )
}
