import './Buttons.scss'
import React from 'react'

import Cancel from './Cancel'
import Submit from './Submit'

interface ButtonsProps {
  isSubmitting?: boolean
  onCancel: () => void
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { isSubmitting = false, onCancel } = props

  return (
    <div className="form-button-container">
      <Cancel onClick={onCancel} />
      <Submit isSubmitting={isSubmitting} />
    </div>
  )
}

export default Buttons
