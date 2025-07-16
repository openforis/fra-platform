import { useOnUpdate } from 'client/hooks'
import { FieldProps } from 'client/components/Form/FormFields/types'

export const useTriggerOnChange = (props: FieldProps): void => {
  const { fieldDefinition, formState, trigger, value } = props
  const { triggerOnChange } = fieldDefinition

  useOnUpdate(() => {
    if (formState.isSubmitted) {
      triggerOnChange?.forEach((propName) => {
        trigger(propName)
      })
    }
  }, [value, triggerOnChange])
}
