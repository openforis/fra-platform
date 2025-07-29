import { Objects } from 'utils/objects'

import { useOnUpdate } from 'client/hooks'

import { PropsWatch } from './types'

// triggerFields: trigger fields on values update (e.g. reset a property validation)
export const useTriggerFields = (props: PropsWatch): void => {
  const { fieldDefinition, formState, trigger, values } = props
  const { name, watches = {} } = fieldDefinition
  const { triggerFields } = watches

  const path = name.split('.')
  const value = Objects.getInPath(values, path)

  useOnUpdate(() => {
    if (!formState.isSubmitted) return

    triggerFields?.forEach((propName) => {
      trigger(propName)
    })
  }, [value, triggerFields])
}
