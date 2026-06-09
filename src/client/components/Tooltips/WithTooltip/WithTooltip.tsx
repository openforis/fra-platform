import React, { PropsWithChildren, useRef } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import classNames from 'classnames'

import { UUIDs } from 'meta/uuid/uuids'
import { Objects } from 'utils/objects'

import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = PropsWithChildren<{
  className?: string
  tooltip?: TooltipProps
}>

const WithTooltip: React.FC<Props> = (props) => {
  const { children, className, tooltip = {} } = props
  const { content, type = TooltipType.info } = tooltip

  const tooltipId = useRef<string>(UUIDs.getUuid())

  return (
    <>
      <div className={className} data-tooltip-id={tooltipId.current}>
        {children}
      </div>

      {!Objects.isEmpty(content) && (
        <div className="tooltip-container">
          <ReactTooltip
            className={classNames(type, tooltip.className)}
            classNameArrow={`${type}-arrow`}
            id={tooltipId.current}
          >
            {content}
          </ReactTooltip>
        </div>
      )}
    </>
  )
}

export default WithTooltip
