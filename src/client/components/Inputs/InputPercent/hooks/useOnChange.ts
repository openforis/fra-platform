import {
  ChangeEventHandler,
  InputHTMLAttributes,
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'

import * as R from 'ramda'

import { Sanitizer } from 'client/utils/sanitizer'

type OnChange = ChangeEventHandler<HTMLInputElement>

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  inputRef: MutableRefObject<HTMLInputElement>
} & {
  onChange: (value?: string) => void
  setLocalValue: (newValue: InputHTMLAttributes<HTMLInputElement>['value']) => void
}

export const useOnChange = (props: Props): OnChange => {
  const { inputRef, onChange, setLocalValue, value } = props

  const [cursor, setCursor] = useState<number | null>(null)

  useLayoutEffect(() => {
    inputRef.current?.setSelectionRange(cursor, cursor)
  }, [inputRef, cursor, value])

  return useCallback<OnChange>(
    (event) => {
      const { value } = event.target
      setCursor(event.target.selectionStart)

      if (!Sanitizer.acceptableAsDecimal(value)) return
      setLocalValue(value)
      if (R.pipe(R.defaultTo(''), R.endsWith('.'))(value)) return

      if (onChange) {
        onChange(value)
      }
    },
    [onChange, setLocalValue]
  )
}
