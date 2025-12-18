import React from 'react'

import Form from 'client/components/Form'
import { FormDefinition, FormProps } from 'client/components/Form/types'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnCancel } from './hooks/useOnCancel'
import { useValidationSchema } from './hooks/useValidationSchema'
import FormSkeleton from './FormSkeleton'

interface FormLoginProps {
  action: FormProps['action']
  disableEmail?: boolean
  email?: string
  hideCancel?: FormProps['hideCancel']
  invitationUuid?: string
  labels?: FormDefinition['labels']
  loading?: boolean
  onSuccess: FormProps['onSuccess']
  password?: boolean
  password2?: boolean
  resetPasswordUuid?: string
}

const FormLogin: React.FC<FormLoginProps> = (props) => {
  const {
    action,
    disableEmail = false,
    email,
    hideCancel = true,
    invitationUuid,
    labels,
    loading = false,
    onSuccess,
    password = true,
    password2 = false,
    resetPasswordUuid,
  } = props

  const formDefinition = useFormDefinition({
    disableEmail,
    email,
    invitationUuid,
    labels,
    password,
    password2,
    resetPasswordUuid,
  })
  const validationSchema = useValidationSchema({ password, password2 })
  const onCancel = useOnCancel()

  if (loading) {
    return <FormSkeleton formDefinition={formDefinition} />
  }

  return (
    <div className="login-form">
      <Form
        action={action}
        formDefinition={formDefinition}
        hideCancel={hideCancel}
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default FormLogin
