import { InputHTMLAttributes, useCallback, useEffect, useRef } from 'react'

import { Sanitizer } from 'client/utils/sanitizer'

type OnChange = React.FocusEventHandler<HTMLInputElement>

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  onChange: (value?: string) => void
  precision: number
}

export const useOnBlur = (props: Props): OnChange => {
  const { onChange, precision, value } = props

  const valueRef = useRef<typeof value>(value)
  useEffect(() => {
    valueRef.current = value
  }, [value])

  return useCallback<OnChange>(
    async (event: React.FocusEvent<HTMLInputElement, Element>) => {
      const { value: newValue } = event.target

      if (newValue === valueRef.current) return

      if (!Sanitizer.acceptableAsDecimal(newValue)) return
      const sanitizedValue = Sanitizer.acceptNextDecimal(newValue, valueRef.current?.toString() ?? '', precision)
      valueRef.current = sanitizedValue
      onChange(sanitizedValue)
    },
    [onChange, precision]
  )
}
