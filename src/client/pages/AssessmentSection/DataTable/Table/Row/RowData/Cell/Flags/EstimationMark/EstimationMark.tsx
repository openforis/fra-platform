import React from 'react'

import { TooltipId } from 'meta/tooltip'

import Flag from '../Flag'
import { useEstimationDetails } from './hooks/useEstimationDetails'
import { Props } from './props'

const EstimationMark: React.FC<Props> = (props) => {
  const { estimationUuid, variableName } = props

  const estimationDetails = useEstimationDetails({ estimationUuid, variableName })

  return (
    <Flag tooltipId={TooltipId.info} tooltipContent={estimationDetails}>
      E
    </Flag>
  )
}

export default EstimationMark
