import './ValidationErrorIndicator.scss'
import React from 'react'

import Icon from 'client/components/Icon'
import { IconName } from 'client/components/Icon/types'
import Flex from 'client/components/Layout/Flex'

type Props = {
  show: boolean
}

const ValidationErrorIndicator: React.FC<Props> = (props) => {
  const { show } = props

  if (!show) return null

  return (
    <Flex alignItems="center" className="validation-error-indicator" justifyContent="center">
      <Icon name={IconName.alert} />
    </Flex>
  )
}

export default ValidationErrorIndicator
