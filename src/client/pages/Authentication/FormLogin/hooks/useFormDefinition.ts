import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

interface Props {
  disableEmail: boolean
  email?: string
  invitationUuid?: string
  labels?: FormDefinition['labels']
  password2: boolean
  password: boolean
  resetPasswordUuid?: string
}

export const useFormDefinition = (props: Props): FormDefinition => {
  const { disableEmail, email, invitationUuid, labels, password, password2, resetPasswordUuid } = props
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
    ]

    if (invitationUuid) {
      fields.push({
        defaultValue: invitationUuid,
        label: '',
        name: 'invitationUuid',
        required: true,
        type: FormFieldType.hidden,
      })
    }

    if (resetPasswordUuid) {
      fields.push({
        defaultValue: resetPasswordUuid,
        label: '',
        name: 'resetPasswordUuid',
        required: true,
        type: FormFieldType.hidden,
      })
    }

    fields.push({
      bordered: true,
      defaultValue: email || '',
      label: 'login.email',
      name: 'email',
      placeholder: t('login.email'),
      required: true,
      type: FormFieldType.text,
      watches: { isDisabled: (): boolean => disableEmail },
    })

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

    if (password2) {
      fields.push({
        bordered: true,
        defaultValue: '',
        label: 'login.repeatPassword',
        name: 'password2',
        placeholder: t('login.repeatPassword'),
        required: true,
        type: FormFieldType.password,
      })
    }

    const formDefinition: FormDefinition = { fields }
    if (labels) formDefinition.labels = labels

    return formDefinition
  }, [
    assessmentName,
    cycleName,
    disableEmail,
    email,
    invitationUuid,
    labels,
    password,
    password2,
    resetPasswordUuid,
    t,
  ])
}
