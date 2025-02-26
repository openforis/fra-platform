import React, { useMemo, useRef } from 'react'

import { useDOMChanges } from './hooks/useDOMChanges'
import { cleanDOM } from './hooks/utils'
import { DiffDOMProps } from './types'

const DiffDOM: React.FC<DiffDOMProps> = (props) => {
  const { current = '', prev = '' } = props

  const ref = useRef<HTMLDivElement>()
  const __html = useMemo<string>(() => cleanDOM(prev), [prev])
  useDOMChanges({ current, prev, ref })

  return <div ref={ref} className="editorWYSIWYG jodit-wysiwyg diff-text" dangerouslySetInnerHTML={{ __html }} />
}

export default DiffDOM
