import './tooltip.less'

import React from 'react'

type Props = {
  text: string
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'Props'... Remove this comment to see the full error message
const Tooltip = ({ text, children, error }: Props) => {
  return (
    <div className={error ? 'error' : ''} data-tooltip={text}>
      {children}
    </div>
  )
}

export default Tooltip
