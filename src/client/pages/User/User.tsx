import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useToaster } from 'client/hooks/toaster'
import Form from 'client/components/Form'
import { Urls } from 'client/utils/urls'

import { useEditUserRules } from './hooks/useEditUserRules'
import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useTargetUser } from './hooks/useTargetUser'
import { useValidationSchema } from './hooks/useValidationSchema'

const User: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { toaster } = useToaster()

  const targetUser = useTargetUser()
  const editUserRules = useEditUserRules({ targetUser })
  const formDefinition = useFormDefinition({ editUserRules, targetUser })
  const validationSchema = useValidationSchema()

  const onSuccess = useOnSuccess()
  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const action = Urls.withSearchParams(ApiEndPoint.User.one(), { assessmentName, cycleName, countryIso })

  useEffect(() => {
    if (location?.state?.personalInfoRequired) {
      toaster.info(t('userManagement.personalInfoRequired'))
    }
  }, [location?.state?.personalInfoRequired, t, toaster])

  if (!formDefinition) return null

  return (
    <div className="app-view__content">
      <Form
        action={action}
        disabled={editUserRules.userDisabled}
        formDefinition={formDefinition}
        hideCancel={Areas.isGlobal(countryIso)}
        method="put"
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default User
