import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { UUID } from 'meta/uuid/uuid'

import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

type Props = {
  email: string
  uuid: UUID
}

export const useFormDefinition = (props: Props): FormDefinition => {
  const { email, uuid } = props
  const { t } = useTranslation()

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
        bordered: true,
        defaultValue: email,
        label: 'login.email',
        name: 'email',
        placeholder: t('login.email'),
        required: true,
        type: FormFieldType.text,
        watches: {
          isDisabled: () => true,
        },
      },
      {
        bordered: true,
        defaultValue: '',
        label: 'login.password',
        name: 'password',
        placeholder: t('login.password'),
        required: true,
        type: FormFieldType.password,
      },
      {
        bordered: true,
        defaultValue: '',
        label: 'login.repeatPassword',
        name: 'password2',
        placeholder: t('login.repeatPassword'),
        required: true,
        type: FormFieldType.password,
      },
    ]

    return { fields }
  }, [email, t, uuid])
}
