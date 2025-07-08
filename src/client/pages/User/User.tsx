// import './User.scss'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { UserEditForms } from 'meta/form/userEdit/forms'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Form from 'client/components/Form'
import { useOnSuccess } from 'client/pages/User/hooks/useOnSuccess'
import { useTargetUser } from 'client/pages/User/hooks/useTargetUser'
import { Urls } from 'client/utils'

const User: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const onSuccess = useOnSuccess()
  const targetUser = useTargetUser()
  const formDefinition = useMemo(() => UserEditForms.newFormDefinition({ t, targetUser }), [t, targetUser])
  const validationSchema = useMemo(() => UserEditForms.newValidationSchema({ t }), [t])

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const params = { assessmentName, cycleName, countryIso }
  const action = Urls.withSearchParams(ApiEndPoint.User.one(), params)

  return (
    <div className="app-view__content user-container">
      <Form
        action={action}
        formDefinition={formDefinition}
        method="put"
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default User
