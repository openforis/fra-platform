import './Tooltips.scss'
import React from 'react'
import { Tooltip } from 'react-tooltip'

import { TooltipId } from 'meta/tooltip'

const tooltips = [TooltipId.black, TooltipId.error, TooltipId.info, TooltipId.success, TooltipId.white]

const Tooltips: React.FC = () => (
  <div className="tooltip-container">
    <Tooltip
      className={TooltipId.info}
      classNameArrow={`${TooltipId.info}-arrow`}
      clickable
      id={TooltipId.infoClickable}
    />

    {tooltips.map((tooltip) => {
      return <Tooltip className={tooltip} classNameArrow={`${tooltip}-arrow`} id={tooltip} />
    })}
  </div>
)

export default Tooltips
