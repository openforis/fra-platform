import { useOnUpdate } from 'client/hooks'

import { PropsWatch } from './types'

// resetIf: reset the field if the resetIf callback returns true
export const useResetIf = (props: PropsWatch): void => {
  const { control, fieldDefinition, resetField, values } = props
  const { name, watches = {} } = fieldDefinition
  const { resetIf } = watches

  useOnUpdate(() => {
    if (!resetIf) return

    const fieldState = control.getFieldState(name)
    if (fieldState.isDirty && resetIf({ values })) {
      resetField(name)
    }
  }, [name, resetField, values])
}
