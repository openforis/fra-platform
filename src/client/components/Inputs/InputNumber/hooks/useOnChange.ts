import { ChangeEventHandler, MutableRefObject, useCallback } from 'react'

import { InputNumberProps } from 'client/components/Inputs/InputNumber/types'
import { Sanitizer } from 'client/utils/sanitizer'

type OnChange = ChangeEventHandler<HTMLInputElement>

type Props = Pick<InputNumberProps, 'onChange' | 'precision'> & {
  inputRef: MutableRefObject<HTMLInputElement>
}

export const useOnChange = (props: Props): OnChange => {
  const { onChange, precision } = props

  return useCallback<OnChange>(
    (event) => {
      const { value } = event.target

      const validationFunction = precision === 0 ? Sanitizer.acceptableAsInteger : Sanitizer.acceptableAsDecimal
      if (!validationFunction(value ?? '')) return

      if (onChange) {
        onChange(event)
      }
    },
    [onChange, precision]
  )
}
