import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { FieldDefinition } from 'client/components/Form/types'

type Returned = Record<string, unknown>

export const useDefaultValues = (fields: Array<FieldDefinition>): Returned => {
  return useMemo<Returned>(() => {
    const values: Returned = {}
    fields.forEach((field) => {
      if (!Objects.isNil(field.defaultValue)) {
        Objects.setInPath({ obj: values, path: field.name.split('.'), value: field.defaultValue })
      }
    })
    return values
  }, [fields])
}
