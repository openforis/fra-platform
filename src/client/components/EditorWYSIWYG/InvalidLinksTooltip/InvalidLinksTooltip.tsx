import React, { ReactNode, useCallback } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { InvalidLink } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

import { TooltipType } from 'client/components/Tooltips/type'

import { useGetErrors } from './hooks/useGetErrors'

type Props = {
  editorClassName: string
  invalidLinks: Array<InvalidLink>
}

type DisableTooltip = (anchor: Element | null) => boolean
type Render = (props: { activeAnchor: Element | null }) => ReactNode

const InvalidLinksTooltip: React.FC<Props> = (props: Props) => {
  const { editorClassName, invalidLinks } = props

  const getErrors = useGetErrors({ invalidLinks })

  const disableTooltip = useCallback<DisableTooltip>((anchor) => Objects.isEmpty(getErrors(anchor)), [getErrors])

  const render = useCallback<Render>(
    ({ activeAnchor }) => {
      const errors = getErrors(activeAnchor)
      if (Objects.isEmpty(errors)) return null

      return errors.map<ReactNode>((error, index) => <div key={`${error}-${index}`}>{error}</div>)
    },
    [getErrors]
  )

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
