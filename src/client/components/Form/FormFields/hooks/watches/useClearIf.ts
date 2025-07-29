import { useRef } from 'react'

import { useOnUpdate } from 'client/hooks'

import { PropsWatch } from './types'

// clearIf: clear the field if the clearIf callback returns shouldClear: true
export const useClearIf = (props: PropsWatch): void => {
  const { fieldDefinition, setValue, values } = props
  const { name, watches = {} } = fieldDefinition
  const { clearIf } = watches

  const previousShouldClear = useRef<boolean>(false)

  useOnUpdate(() => {
    if (!clearIf) return

    const { clearValue, shouldClear } = clearIf({ values })

    if (shouldClear !== previousShouldClear.current && shouldClear) setValue(name, clearValue)

    previousShouldClear.current = shouldClear
  }, [clearIf, name, setValue, values])
}
