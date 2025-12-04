import React from 'react'
import { useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'

import Form from 'client/components/Form'
import { useOnCancel } from 'client/pages/Login/ChangePassword/ChangePasswordForm/hooks/useOnCancel'
import { Data } from 'client/pages/Login/ChangePassword/hooks/useData'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useValidationSchema } from './hooks/useValidationSchema'

type Props = {
  data: Data
}

const ChangePasswordForm: React.FC<Props> = (props) => {
  const { data } = props
  const { resetPasswordUuid } = useParams<{ resetPasswordUuid: string }>()

  const { email } = data.user

  const formDefinition = useFormDefinition({ email, uuid: resetPasswordUuid || '' })
  const validationSchema = useValidationSchema()

  const onCancel = useOnCancel()

  const onSuccess = useOnSuccess()

  return (
    <Form
      key={`${resetPasswordUuid}-${email}`}
      action={ApiEndPoint.Auth.changePassword()}
      formDefinition={formDefinition}
      method="post"
      onCancel={onCancel}
      onSuccess={onSuccess}
      validationSchema={validationSchema}
    />
  )
}

export default ChangePasswordForm
