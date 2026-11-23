import React, { ReactNode, useCallback } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { InvalidLink } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

import { TooltipType } from 'client/components/Tooltips/type'

import { useGetError } from './hooks/useGetError'

type Props = {
  editorClassName: string
  invalidLinks: Array<InvalidLink>
}

type DisableTooltip = (anchor: Element | null) => boolean
type Render = (props: { activeAnchor: Element | null }) => ReactNode

const InvalidLinksTooltip: React.FC<Props> = (props: Props) => {
  const { editorClassName, invalidLinks } = props

  const getError = useGetError({ invalidLinks })

  const disableTooltip = useCallback<DisableTooltip>((anchor) => Objects.isNil(getError(anchor)), [getError])
  const render = useCallback<Render>(({ activeAnchor }) => getError(activeAnchor) ?? null, [getError])

  return (
    <div className="tooltip-container">
      <ReactTooltip
        anchorSelect={`.${editorClassName} .jodit-wysiwyg a`}
        className={TooltipType.error}
        classNameArrow={`${TooltipType.error}-arrow`}
        disableTooltip={disableTooltip}
        positionStrategy="fixed"
        render={render}
      />
    </div>
  )
}

export default InvalidLinksTooltip
