import {
  ChangeEventHandler,
  InputHTMLAttributes,
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'

type OnChange = ChangeEventHandler<HTMLInputElement>

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  inputRef: MutableRefObject<HTMLInputElement>
}

export const useOnChange = (props: Props): OnChange => {
  const { inputRef, onChange, value } = props

  const [cursor, setCursor] = useState<number | null>(null)

  useLayoutEffect(() => {
    inputRef.current?.setSelectionRange(cursor, cursor)
  }, [inputRef, cursor, value])

  return useCallback<OnChange>(
    (event) => {
      setCursor(event.target.selectionStart)

      if (onChange) {
        onChange(event)
      }
    },
    [onChange]
  )
}
