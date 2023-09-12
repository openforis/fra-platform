import './Tooltips.scss'
import React from 'react'
import { Tooltip } from 'react-tooltip'

import { TooltipId } from 'meta/tooltip'

const Tooltips: React.FC = () => (
  <div className="tooltip-container">
    <Tooltip id={TooltipId.error} className={TooltipId.error} classNameArrow={`${TooltipId.error}-arrow`} />

    <Tooltip id={TooltipId.info} className={TooltipId.info} classNameArrow={`${TooltipId.info}-arrow`} />
  </div>
)

export default Tooltips
