import { useCallback } from 'react'

import { Option, SelectProps } from 'client/components/Inputs/Select/types'

type Returned = (option?: Option | Array<Option>) => void

export const useOnChange = (props: SelectProps): Returned => {
  const { isMulti, onChange } = props

  return useCallback<Returned>(
    (option?: Option | Array<Option>) => {
      if (isMulti && Array.isArray(option)) {
        onChange(option.map(({ value }) => value))
      } else {
        onChange((option as Option)?.value ?? null)
      }
    },
    [isMulti, onChange]
  )
}
