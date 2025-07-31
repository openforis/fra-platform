import './Buttons.scss'
import React from 'react'

import { FormProps } from 'client/components/Form/types'

import Cancel from './Cancel'
import Submit from './Submit'

type ButtonsProps = Pick<FormProps, 'disabled' | 'hideCancel'> & {
  isDirty?: boolean
  isSubmitting?: boolean
  onCancel: () => void
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { disabled, hideCancel, isDirty, isSubmitting, onCancel } = props

  return (
    <div className="form-button-container">
      <Cancel disabled={disabled} hideCancel={hideCancel} onClick={onCancel} />
      <Submit disabled={disabled} isDirty={isDirty} isSubmitting={isSubmitting} />
    </div>
  )
}

export default Buttons
