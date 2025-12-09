import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Routes } from 'meta/routes/routes'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import Form from 'client/components/Form'
import Link from 'client/components/Links/Link'

import { useFormDefinition } from '../hooks/useFormDefinition'
import { useOnSuccess } from '../hooks/useOnSuccess'
import { useValidationSchema } from '../hooks/useValidationSchema'

type Props = {
  onCancel: () => void
}

const LocalLoginForm: React.FC<Props> = (props) => {
  const { onCancel } = props
  const { t } = useTranslation()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const formDefinition = useFormDefinition()
  const validationSchema = useValidationSchema()
  const onSuccess = useOnSuccess()

  return (
    <div className="login__formWrapper">
      <div className="login-form">
        <Form
          action={ApiEndPoint.Auth.login()}
          formDefinition={formDefinition}
          method="post"
          onCancel={onCancel}
          onSuccess={onSuccess}
          validationSchema={validationSchema}
        />

        <Link className="btn-forgot-pwd" to={Routes.LoginResetPassword.generatePath({ assessmentName, cycleName })}>
          {t('login.forgotPassword')}
        </Link>
      </div>
    </div>
  )
}

export default LocalLoginForm
