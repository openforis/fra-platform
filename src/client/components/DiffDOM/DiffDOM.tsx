import React, { useRef } from 'react'

import classNames from 'classnames'

import { useDOMChanges } from './hooks/useDOMChanges'
import { cleanDOM } from './hooks/utils'
import { DiffDOMProps } from './types'

const DiffDOM: React.FC<DiffDOMProps> = (props) => {
  const { className = '', current, prev } = props

  const ref = useRef<HTMLDivElement>()

  useDOMChanges({
    current,
    prev,
    ref,
  })

  return (
    <div
      ref={ref}
      className={classNames('editorWYSIWYG jodit-wysiwyg', className)}
      dangerouslySetInnerHTML={{
        __html: cleanDOM(prev ?? ''),
      }}
    />
  )
}

export default DiffDOM
