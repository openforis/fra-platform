import { useEffect, useState } from 'react'

import { Objects } from 'utils/objects'

import { useOnUpdate } from 'client/hooks'
import { FieldProps } from 'client/components/Form/FormFields/types'

type Returned = {
  disabled: boolean
}

export const useWatches = (props: FieldProps): Returned => {
  const { fieldDefinition, formState, trigger, watch } = props
  const { name, watches = {} } = fieldDefinition
  const { isDisabled, triggerFields } = watches

  const values = watch()
  const path = name.split('.')
  const value = Objects.getInPath(values, path)

  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (isDisabled) {
      setDisabled(isDisabled({ values }))
    }
  }, [isDisabled, values])

  useOnUpdate(() => {
    if (formState.isSubmitted) {
      triggerFields?.forEach((propName) => {
        trigger(propName)
      })
    }
  }, [value, triggerFields])

  return { disabled }
}
