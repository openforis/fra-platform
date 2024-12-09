import { ChangeEventHandler, MutableRefObject, useCallback, useLayoutEffect, useState } from 'react'

import { InputNumberProps } from 'client/components/Inputs/InputNumber/types'
import { Sanitizer } from 'client/utils/sanitizer'

type OnChange = ChangeEventHandler<HTMLInputElement>

type Props = Pick<InputNumberProps, 'isInteger' | 'onChange' | 'value'> & {
  inputRef: MutableRefObject<HTMLInputElement>
  setLocalValue: (value: string) => void
}

export const useOnChange = (props: Props): OnChange => {
  const { inputRef, isInteger, onChange, setLocalValue, value } = props

  const [cursor, setCursor] = useState<number | null>(null)

  useLayoutEffect(() => {
    inputRef.current?.setSelectionRange(cursor, cursor)
  }, [inputRef, cursor, value])

  return useCallback<OnChange>(
    (event) => {
      const { value } = event.target
      setCursor(event.target.selectionStart)

      const validationFunction = isInteger ? Sanitizer.acceptableAsInteger : Sanitizer.acceptableAsDecimal
      if (!validationFunction(value)) return

      setLocalValue(value)
      if ((value ?? '').endsWith('.')) return

      if (onChange) {
        onChange(event)
      }
    },
    [isInteger, onChange, setLocalValue]
  )
}
