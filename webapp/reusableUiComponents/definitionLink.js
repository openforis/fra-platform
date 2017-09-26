import React from 'react'
import './definitionLink.less'

export default ({className, document, section, title, lang}) =>
<div className={`definition-link ${className ? className : ''}`}
     onClick={() => window.open(`definitions/${lang}/${document}${section ? '#'+section : ''}`, document, 'height=640,width=360')}>
     {title}
</div>
