import React from 'react'

import Form from 'client/components/Form'
import { FormDefinition, FormProps } from 'client/components/Form/types'

import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnCancel } from './hooks/useOnCancel'
import { useValidationSchema } from './hooks/useValidationSchema'

interface FormLoginProps {
  action: FormProps['action']
  hideCancel?: FormProps['hideCancel']
  labels?: FormDefinition['labels']
  onSuccess: FormProps['onSuccess']
  password?: boolean
}

const FormLogin: React.FC<FormLoginProps> = (props) => {
  const { action, hideCancel = true, labels, onSuccess, password = true } = props

  const formDefinition = useFormDefinition({ labels, password })
  const validationSchema = useValidationSchema({ password })
  const onCancel = useOnCancel()

  return (
    <div className="login-form">
      <Form
        action={action}
        formDefinition={formDefinition}
        hideCancel={hideCancel}
        onCancel={onCancel}
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </div>
  )
}

export default FormLogin
