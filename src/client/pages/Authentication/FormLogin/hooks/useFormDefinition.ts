import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

interface Props {
  labels?: FormDefinition['labels']
  password: boolean
}

export const useFormDefinition = (props: Props): FormDefinition => {
  const { labels, password } = props
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useMemo<FormDefinition>((): FormDefinition => {
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

    if (password) {
      fields.push({
        bordered: true,
        defaultValue: '',
        label: 'login.password',
        name: 'password',
        placeholder: t('login.password'),
        required: true,
        type: FormFieldType.password,
      })
    }

    const formDefinition: FormDefinition = { fields }
    if (labels) formDefinition.labels = labels

    return formDefinition
  }, [assessmentName, cycleName, labels, password, t])
}
