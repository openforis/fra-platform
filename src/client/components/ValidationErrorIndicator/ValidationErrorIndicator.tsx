import './ValidationErrorIndicator.scss'
import React from 'react'

import { UUID } from 'meta/uuid/uuid'

import Icon from 'client/components/Icon'

import { useShow } from './hooks/useShow'

type Props = {
  target: 'section' | 'subSection'
  uuid: UUID
}

const ValidationErrorIndicator: React.FC<Props> = (props) => {
  const show = useShow(props)

  if (!show) return null

  return (
    <div className="validation-error-indicator">
      <Icon name="alert" />
    </div>
  )
}

export default ValidationErrorIndicator
