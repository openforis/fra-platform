import { useCallback, useEffect, useRef } from 'react'

import { InputNumberProps } from 'client/components/Inputs/InputNumber/types'
import { Sanitizer } from 'client/utils/sanitizer'

type OnChange = React.FocusEventHandler<HTMLInputElement>

type Props = Pick<InputNumberProps, 'isInteger' | 'onChange' | 'precision' | 'shouldRound' | 'value'>

export const useOnBlur = (props: Props): OnChange => {
  const { isInteger, onChange, precision, shouldRound, value } = props

  const valueRef = useRef<typeof value>(value)
  useEffect(() => {
    valueRef.current = value
  }, [value])

  return useCallback<OnChange>(
    async (event: React.FocusEvent<HTMLInputElement, Element>) => {
      const { value } = event.target

      if (!shouldRound || isInteger) return

      if (!Sanitizer.acceptableAsDecimal(value)) return

      const sanitizedRoundedValue = Sanitizer.acceptNextDecimal(value, valueRef.current?.toString(), precision)
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
    [isInteger, onChange, precision, shouldRound]
  )
}
