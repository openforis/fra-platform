import './ValidationErrorIndicator.scss'
import React from 'react'

import Icon from 'client/components/Icon'
import Flex from 'client/components/Layout/Flex'

type Props = {
  show: boolean
}

const ValidationErrorIndicator: React.FC<Props> = (props) => {
  const { show } = props

  if (!show) return null

  return (
    <Flex alignItems="center" className="validation-error-indicator" justifyContent="center">
      <Icon name="alert" />
    </Flex>
  )
}

export default ValidationErrorIndicator
