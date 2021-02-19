import React from 'react'
import './definitionLink.less'

export default ({ className, document, anchor, title, lang }: any) => (
  <div
    className={`definition-link ${className || ''} no-print`}
    onClick={() =>
      window.open(`/definitions/${lang}/${document}${anchor ? `#${anchor}` : ''}`, document, 'height=640,width=360')
    }
  >
    {title}
  </div>
)
