import React from 'react'
import './definitionLink.less'

export default ({className, document, section, title}) =>
<div className={`definition-link ${className ? className : ''}`}
     onClick={() => window.open(`definitions/en/${document}${section ? '#'+section : ''}`, document, 'height=640,width=360')}>
     {title}
</div>
