import './Buttons.scss'
import React from 'react'

import { FormDefinitionLabels, FormProps } from 'client/components/Form/types'
import Flex from 'client/components/Layout/Flex'

import Cancel from './Cancel'
import Submit from './Submit'

type ButtonsProps = Pick<FormProps, 'disabled' | 'hideCancel' | 'isDirtyOverride'> & {
  isDirty?: boolean
  isSubmitting?: boolean
  onCancel: () => void
  labels?: FormDefinitionLabels
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { disabled, hideCancel, isDirty, isDirtyOverride, isSubmitting, labels, onCancel } = props

  return (
    <Flex className="form-button-container" gap={'32'} justifyContent={'center'}>
      <Cancel disabled={disabled} hideCancel={hideCancel} onClick={onCancel} />
      <Submit
        disabled={disabled}
        isDirty={isDirtyOverride ?? isDirty}
        isSubmitting={isSubmitting}
        label={labels?.submit}
      />
    </Flex>
  )
}

export default Buttons
