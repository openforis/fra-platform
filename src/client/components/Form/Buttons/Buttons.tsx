import './Buttons.scss'
import React from 'react'

import { FormProps } from 'client/components/Form/types'

import Cancel from './Cancel'
import Submit from './Submit'

type ButtonsProps = Pick<FormProps, 'disabled'> & {
  isSubmitting?: boolean
  onCancel: () => void
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { disabled, isSubmitting = false, onCancel } = props

  return (
    <div className="form-button-container">
      <Cancel disabled={disabled} onClick={onCancel} />
      <Submit disabled={disabled} isSubmitting={isSubmitting} />
    </div>
  )
}

export default Buttons
