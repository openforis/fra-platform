import {
  ChangeEventHandler,
  InputHTMLAttributes,
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'

type OnChange = ChangeEventHandler<HTMLInputElement>

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'> & {
  inputRef: MutableRefObject<HTMLInputElement>
}

export const useOnChange = (props: Props): OnChange => {
  const { inputRef, onChange, type, value } = props

  const [cursor, setCursor] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (['password', 'text'].includes(type)) {
      inputRef.current?.setSelectionRange(cursor, cursor)
    }
  }, [cursor, inputRef, type, value])

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
