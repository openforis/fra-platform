import './Tooltips.scss'
import React from 'react'
import { Tooltip } from 'react-tooltip'

import { TooltipId } from 'meta/tooltip'

const Tooltips: React.FC = () => (
  <div className="tooltip-container">
    <Tooltip className={TooltipId.error} classNameArrow={`${TooltipId.error}-arrow`} id={TooltipId.error} />

    <Tooltip className={TooltipId.info} classNameArrow={`${TooltipId.info}-arrow`} id={TooltipId.info} />

    <Tooltip
      className={TooltipId.info}
      classNameArrow={`${TooltipId.info}-arrow`}
      clickable
      id={TooltipId.infoClickable}
    />
  </div>
)

export default Tooltips
