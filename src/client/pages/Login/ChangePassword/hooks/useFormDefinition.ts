import { useMemo } from 'react'

import { UUID } from 'meta/uuid/uuid'

import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

type Props = {
  email: string
  uuid: UUID
}

export const useFormDefinition = (props: Props): FormDefinition => {
  const { email, uuid } = props

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        defaultValue: uuid,
        label: '',
        name: 'uuid',
        required: true,
        type: FormFieldType.hidden,
      },
      {
        defaultValue: email,
        label: 'login.email',
        name: 'email',
        placeholder: 'login.email',
        required: true,
        type: FormFieldType.text,
        watches: {
          isDisabled: () => true,
        },
      },
      {
        defaultValue: '',
        label: 'login.password',
        name: 'password',
        placeholder: 'login.password',
        required: true,
        type: FormFieldType.password,
      },
      {
        defaultValue: '',
        label: 'login.repeatPassword',
        name: 'password2',
        placeholder: 'login.repeatPassword',
        required: true,
        type: FormFieldType.password,
      },
    ]

    return { fields }
  }, [email, uuid])
}
