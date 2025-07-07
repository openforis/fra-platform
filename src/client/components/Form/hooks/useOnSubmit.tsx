import { useCallback } from 'react'
import { FormProps as ReactHookFormProps } from 'react-hook-form'

import { FormFieldType, FormProps } from 'client/components/Form/types'

export const useOnSubmit = (props: FormProps) => {
  const { formDefinition } = props

  const fields = formDefinition.fields.reduce<Array<string>>((acc, item) => {
    if (item.type === FormFieldType.avatar) acc.push(item.name)
    return acc
  }, [])

  return useCallback<ReactHookFormProps<unknown>['onSubmit']>(
    (data) => {
      // Manipulate data before submitting
      fields.forEach((field) => {
        // @ts-ignore
        if (field in data.data) {
          // @ts-ignore
          data.formData.append(field, data.data[field])
        }
      })

      return data
    },
    [fields]
  )
}
