import { useMemo } from 'react'

import { Option, OptionsGroup, SelectProps } from 'client/components/Inputs/Select/types'

type ValueSelect = Option | Array<Option> | null

export const useValue = (props: SelectProps): ValueSelect => {
  const { isMulti, options, value: valueInput } = props

  return useMemo<ValueSelect>(() => {
    let _value: ValueSelect = null

    if (isMulti && Array.isArray(valueInput)) {
      _value = [] as Array<Option>
      options.forEach((optionOrGroup) => {
        if (Object.hasOwn(optionOrGroup, 'options')) {
          const group = optionOrGroup as OptionsGroup
          ;(_value as Array<Option>).push(...group.options.filter((option) => valueInput.includes(option.value)))
        } else if (valueInput.includes((optionOrGroup as Option).value)) {
          ;(_value as Array<Option>).push(optionOrGroup as Option)
        }
      })
    } else if (valueInput) {
      for (let i = 0; i < options.length; i += 1) {
        const optionOrGroup = options[i]
        if (Object.hasOwn(optionOrGroup, 'options')) {
          _value = (optionOrGroup as OptionsGroup).options.find((option) => option.value === valueInput)
        }
        if ((optionOrGroup as Option).value === valueInput) {
          _value = optionOrGroup as Option
        }
        if (_value) break
      }
    }

    return _value
  }, [isMulti, options, valueInput])
}
