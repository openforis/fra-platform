import React, { HTMLAttributes, PropsWithChildren, useRef } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import classNames from 'classnames'

import { UUIDs } from 'meta/uuid/uuids'
import { Objects } from 'utils/objects'

import { TooltipProps, TooltipType } from 'client/components/Tooltips/type'

type Props = PropsWithChildren<
  Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'id' | 'style'> & {
    dataTestId?: string
    tooltip?: TooltipProps
  }
>

const WithTooltip: React.FC<Props> = (props) => {
  const { children, className, dataTestId, id, style, tooltip = {} } = props
  const { content, type = TooltipType.info } = tooltip

  const tooltipId = useRef<string>(UUIDs.getUuid())

  return (
    <div className={className} data-testid={dataTestId} data-tooltip-id={tooltipId.current} id={id} style={style}>
      {children}

      {!Objects.isEmpty(content) && (
        <div className="tooltip-container">
          <ReactTooltip
            className={classNames(type, tooltip.className)}
            classNameArrow={`${type}-arrow`}
            id={tooltipId.current}
            positionStrategy="fixed"
          >
            {content}
          </ReactTooltip>
        </div>
      )}
    </div>
  )
}

export default WithTooltip
