// import './User.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Form from 'client/components/Form'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSubmit } from './hooks/useOnSubmit'

const User: React.FC = () => {
  useCountryRouteParams()
  const navigate = useNavigate()
  const onSubmit = useOnSubmit()
  const formDefinition = useFormDefinition()

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <div className="app-view__content user-container">
      <Form formDefinition={formDefinition} onCancel={onCancel} onSubmit={onSubmit} />
    </div>
  )
}

export default User
