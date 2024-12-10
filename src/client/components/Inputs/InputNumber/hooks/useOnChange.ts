import { ChangeEventHandler, MutableRefObject, useCallback, useLayoutEffect, useState } from 'react'

import { InputNumberProps } from 'client/components/Inputs/InputNumber/types'
import { Sanitizer } from 'client/utils/sanitizer'

type OnChange = ChangeEventHandler<HTMLInputElement>

type Props = Pick<InputNumberProps, 'onChange' | 'precision' | 'value'> & {
  inputRef: MutableRefObject<HTMLInputElement>
  setLocalValue: (value: string) => void
}

export const useOnChange = (props: Props): OnChange => {
  const { inputRef, onChange, precision, setLocalValue, value } = props

  const [cursor, setCursor] = useState<number | null>(null)

  useLayoutEffect(() => {
    inputRef.current?.setSelectionRange(cursor, cursor)
  }, [inputRef, cursor, value])

  return useCallback<OnChange>(
    (event) => {
      const { value } = event.target
      setCursor(event.target.selectionStart)

      const validationFunction = precision === 0 ? Sanitizer.acceptableAsInteger : Sanitizer.acceptableAsDecimal
      if (!validationFunction(value ?? '')) return

      setLocalValue(value)
      if (value.endsWith('.')) return

      if (onChange) {
        onChange(event)
      }
    },
    [onChange, precision, setLocalValue]
  )
}
