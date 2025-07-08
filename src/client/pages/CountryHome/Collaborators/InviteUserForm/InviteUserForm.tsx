import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { UserInvitationForms } from 'meta/form/userInvitation/forms'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Form from 'client/components/Form'
import { Urls } from 'client/utils'

import { useOnSuccess } from './hooks/useOnSuccess'

const InviteUserForm: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const navigate = useNavigate()
  const onSuccess = useOnSuccess()
  const formDefinition = useMemo(() => UserInvitationForms.newFormDefinition({ language, t }), [language, t])
  const validationSchema = useMemo(() => UserInvitationForms.newValidationSchema({ t }), [t])

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const params = { assessmentName, cycleName, countryIso }
  const action = Urls.withSearchParams(ApiEndPoint.User.invite(), params)

  return (
    <div className="app-view__content">
      <Form
        action={action}
        formDefinition={formDefinition}
        method="post"
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default InviteUserForm
