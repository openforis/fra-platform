import { useCallback } from 'react'

import { Objects } from 'utils/objects'

import { NodeValue } from 'meta/assessment'

import { Option, SelectProps } from 'client/components/Inputs/Select'

type Props = {
  nodeValue: NodeValue
}

type Returned = SelectProps['isValidNewOption']

export const useIsValidNewOption = (props: Props): Returned => {
  const { nodeValue } = props

  return useCallback<Returned>(
    // This function is used by react-select to decide whether or not to display
    // "Add Option" in the options list.
    (inputValue: string | null, value: Array<Option>, options: Array<Option>) => {
      const inputValueTrimmed = (inputValue ?? '').trim()
      if (inputValueTrimmed === '') return false

      const selectedOption = value?.at(0)

      if (!Objects.isEmpty(selectedOption) && selectedOption.label === inputValueTrimmed) {
        return false
      }
      if (nodeValue?.raw?.toLocaleLowerCase() === inputValueTrimmed.toLocaleLowerCase()) {
        return false
      }

      const isInputValueInOptions = options.some(
        (option) => option.label.toLocaleLowerCase() === inputValueTrimmed.toLocaleLowerCase()
      )
      if (isInputValueInOptions) return false

      return true
    },
    [nodeValue?.raw]
  )
}
