import React from 'react'
import './DefinitionLink.scss'
import { Lang } from '@meta/lang'

type Props = {
  className?: string
  document: string
  anchor: string
  title: string
  lang: Lang | string
}

const DefinitionLink: React.FC<Props> = (props: Props) => {
  const { className, document, anchor, title, lang } = props
  return (
    <div
      className={`definition-link ${className} no-print`}
      onClick={() =>
        window.open(`/definitions/${lang}/${document}${anchor ? `#${anchor}` : ''}`, document, 'height=640,width=360')
      }
    >
      {title}
    </div>
  )
}

DefinitionLink.defaultProps = {
  className: '',
}

export default DefinitionLink
