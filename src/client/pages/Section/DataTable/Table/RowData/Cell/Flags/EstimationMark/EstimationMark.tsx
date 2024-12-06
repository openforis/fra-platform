import './EstimationMark.scss'
import React from 'react'

import { TooltipId } from 'meta/tooltip'

import Flag from '../Flag'
import { useEstimationDetails } from './hooks/useEstimationDetails'
import { Props } from './props'

const EstimationMark: React.FC<Props> = (props) => {
  const { estimationUuid, variableName } = props

  const { node, tooltipContent } = useEstimationDetails({ estimationUuid, variableName })

  return (
    <Flag tooltipContent={tooltipContent} tooltipId={TooltipId.info}>
      {node}
    </Flag>
  )
}

export default EstimationMark
