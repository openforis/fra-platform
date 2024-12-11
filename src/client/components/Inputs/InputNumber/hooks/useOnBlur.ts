import { useCallback, useEffect, useRef } from 'react'

import { InputNumberProps } from 'client/components/Inputs/InputNumber/types'
import { Sanitizer } from 'client/utils/sanitizer'

type OnChange = React.FocusEventHandler<HTMLInputElement>

type Props = Pick<InputNumberProps, 'onChange' | 'precision' | 'value'>

export const useOnBlur = (props: Props): OnChange => {
  const { onChange, precision, value } = props

  const valueRef = useRef<typeof value>(value)
  useEffect(() => {
    valueRef.current = value
  }, [value])

  return useCallback<OnChange>(
    async (event: React.FocusEvent<HTMLInputElement, Element>) => {
      const { value } = event.target

      if (precision === 0) return

      if (!Sanitizer.acceptableAsDecimal(value)) return

      const sanitizedRoundedValue = Sanitizer.acceptNextDecimal(value ?? '', valueRef.current?.toString(), precision)
      if (sanitizedRoundedValue === valueRef.current) return

      valueRef.current = sanitizedRoundedValue

      const modifiedEvent = {
        ...event,
        target: {
          ...event.target,
          value: sanitizedRoundedValue,
        },
      }
      onChange(modifiedEvent)
    },
    [onChange, precision]
  )
}
