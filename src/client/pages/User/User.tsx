// import './User.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Form from 'client/components/Form'
import { Urls } from 'client/utils'

import { useEditUserRules } from './hooks/useEditUserRules'
import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useTargetUser } from './hooks/useTargetUser'
import { useValidationSchema } from './hooks/useValidationSchema'

const User: React.FC = () => {
  const navigate = useNavigate()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const targetUser = useTargetUser()

  const editUserRules = useEditUserRules({ targetUser })
  const formDefinition = useFormDefinition({ editUserRules, targetUser })
  const validationSchema = useValidationSchema({ editUserRules })

  const onSuccess = useOnSuccess()
  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const params = { assessmentName, cycleName, countryIso }
  const action = Urls.withSearchParams(ApiEndPoint.User.one(), params)

  if (!targetUser) return null

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
