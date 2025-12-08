import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

export const useFormDefinition = (): FormDefinition => {
  const { t } = useTranslation()

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        bordered: true,
        defaultValue: '',
        label: 'login.email',
        name: 'email',
        placeholder: t('login.email'),
        required: true,
        type: FormFieldType.text,
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
    ]

    return { fields }
  }, [t])
}
