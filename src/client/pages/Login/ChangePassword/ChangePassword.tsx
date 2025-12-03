import './ChangePassword.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useGetRequest } from 'client/hooks/getRequest'
import Form from 'client/components/Form'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useValidationSchema } from './hooks/useValidationSchema'

const ChangePassword: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { resetPasswordUuid } = useParams<{ resetPasswordUuid: string }>()

  const [email, setEmail] = useState<string>('')

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.User.resetPassword(), {
    params: { resetPasswordUuid },
  })

  useEffect(() => {
    if (resetPasswordUuid) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordUuid])

  useEffect(() => {
    if (data?.user?.email) {
      setEmail(data.user.email)
    }
  }, [data])

  const formDefinition = useFormDefinition({ email, uuid: resetPasswordUuid || '' })
  const validationSchema = useValidationSchema()

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const onSuccess = useOnSuccess()

  if (!resetPasswordUuid || !data?.user?.email) {
    return (
      <div className="change-password">
        <h3>{t('login.expired')}</h3>
      </div>
    )
  }

  return (
    <div className="change-password">
      <Form
        key={`${resetPasswordUuid}-${email}`}
        action={ApiEndPoint.Auth.changePassword()}
        formDefinition={formDefinition}
        method="post"
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default ChangePassword
