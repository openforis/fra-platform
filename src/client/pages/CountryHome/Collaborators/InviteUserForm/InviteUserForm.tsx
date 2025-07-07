import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Form from 'client/components/Form'
import { Urls } from 'client/utils'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'

const InviteUserForm: React.FC = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const navigate = useNavigate()
  const onSuccess = useOnSuccess()
  const formDefinition = useFormDefinition()

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const params = { assessmentName, cycleName, countryIso }
  const action = Urls.withSearchParams(ApiEndPoint.User.invite(), params)

  return (
    <div className="app-view__content">
      <Form action={action} formDefinition={formDefinition} method="post" onCancel={onCancel} onSuccess={onSuccess} />
    </div>
  )
}

export default InviteUserForm
