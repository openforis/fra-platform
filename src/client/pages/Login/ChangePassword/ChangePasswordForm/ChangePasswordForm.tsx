import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'

import Form from 'client/components/Form'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useValidationSchema } from './hooks/useValidationSchema'

type Props = {
  data: {
    user: {
      email: string
    }
  }
}

const ChangePasswordForm: React.FC<Props> = (props) => {
  const { data } = props
  const navigate = useNavigate()
  const { resetPasswordUuid } = useParams<{ resetPasswordUuid: string }>()

  const { email } = data.user

  const formDefinition = useFormDefinition({ email, uuid: resetPasswordUuid || '' })
  const validationSchema = useValidationSchema()

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

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
