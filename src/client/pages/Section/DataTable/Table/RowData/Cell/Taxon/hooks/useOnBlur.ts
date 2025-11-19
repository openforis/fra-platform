import { useCallback } from 'react'

import { NodeValue } from 'meta/assessment/node'

import { Option, SelectProps } from 'client/components/Inputs/Select'

type Props = {
  nodeValue: NodeValue
  onChange: SelectProps['onChange']
  onCreateOption: SelectProps['onCreateOption']
  options: Array<Option>
}

type Returned = SelectProps['onBlur']

export const useOnBlur = (props: Props): Returned => {
  const { nodeValue, onChange, onCreateOption, options } = props

  return useCallback<Returned>(
    (event) => {
      const { value } = event.target
      const valueTrimmed = (value ?? '').trim()
      if (valueTrimmed === nodeValue?.raw) return

      const matchingOption = options.find(
        (option) => option.label.toString().toLowerCase() === valueTrimmed.toLowerCase()
      )
      if (matchingOption) {
        onChange(matchingOption.value, { action: 'select-option', option: matchingOption })
        return
      }

      onCreateOption(valueTrimmed)
    },
    [nodeValue.raw, onChange, onCreateOption, options]
  )
}
