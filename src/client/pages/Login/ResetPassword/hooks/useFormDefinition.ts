import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

export const useFormDefinition = (): FormDefinition => {
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        defaultValue: assessmentName,
        label: '',
        name: 'assessmentName',
        required: true,
        type: FormFieldType.hidden,
      },
      {
        defaultValue: cycleName,
        label: '',
        name: 'cycleName',
        required: true,
        type: FormFieldType.hidden,
      },
      {
        bordered: true,
        defaultValue: '',
        label: 'login.email',
        name: 'email',
        placeholder: t('login.email'),
        required: true,
        type: FormFieldType.text,
      },
    ]

    return { fields }
  }, [assessmentName, cycleName, t])
}
