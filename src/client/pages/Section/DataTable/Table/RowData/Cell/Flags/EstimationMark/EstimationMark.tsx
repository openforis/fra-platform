import './EstimationMark.scss'
import React from 'react'

import Flag from '../Flag'
import { useEstimationDetails } from './hooks/useEstimationDetails'
import { Props } from './props'

const EstimationMark: React.FC<Props> = (props) => {
  const { estimationUuid, variableName } = props

  const { node, tooltip } = useEstimationDetails({ estimationUuid, variableName })

  return <Flag tooltip={tooltip}>{node}</Flag>
}

export default EstimationMark
