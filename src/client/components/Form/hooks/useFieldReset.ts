import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { FormDefinition } from '../types'

interface UseFieldResetProps {
  fields: FormDefinition['fields']
  watchValues: Record<string, unknown>
  setValue: UseFormSetValue<any>
  defaultValues: Record<string, unknown>
}

export const useFieldReset = ({ defaultValues, fields, setValue, watchValues }: UseFieldResetProps) => {
  useEffect(() => {
    fields.forEach((fieldDefinition) => {
      const { name, shouldShow } = fieldDefinition
      if (shouldShow && !shouldShow(watchValues)) {
        setValue(name, defaultValues[name])
      }
    })
  }, [defaultValues, fields, setValue, watchValues])
}
