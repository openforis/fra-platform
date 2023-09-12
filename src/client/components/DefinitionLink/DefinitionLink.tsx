import './DefinitionLink.scss'
import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Lang } from 'meta/lang'

type Props = {
  assessmentName: string
  cycleName: string
  className?: string
  document: string
  anchor: string
  title: string
  lang: Lang | string
}

const DefinitionLink: React.FC<Props> = (props: Props) => {
  const { className, document, anchor, title, lang, assessmentName, cycleName } = props
  return (
    <div
      className={`definition-link ${className} no-print`}
      onClick={() =>
        window.open(
          `${ApiEndPoint.definitions(lang, document, assessmentName, cycleName)}${anchor ? `#${anchor}` : ''}`,
          document,
          'height=640,width=360'
        )
      }
      aria-hidden="true"
    >
      {title}
    </div>
  )
}

DefinitionLink.defaultProps = {
  className: '',
}

export default DefinitionLink
