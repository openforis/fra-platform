import './ValidationErrorIndicator.scss'
import React from 'react'

import { UUID } from 'meta/uuid/uuid'

import Icon from 'client/components/Icon'
import Flex from 'client/components/Layout/Flex'

import { useShow } from './hooks/useShow'

type Props = {
  target: 'section' | 'subSection'
  uuid: UUID
}

const ValidationErrorIndicator: React.FC<Props> = (props) => {
  const show = useShow(props)

  if (!show) return null

  return (
    <Flex alignItems="center" className="validation-error-indicator" justifyContent="center">
      <Icon name="alert" />
    </Flex>
  )
}

export default ValidationErrorIndicator
