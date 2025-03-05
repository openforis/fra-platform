import React from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'

import { EditorWYSIWYGProps } from './EditorWYSIWYG'
import EditorWYSIWYGWithRepositoryContext from './EditorWYSIWYGWithRepositoryContext'

const EditorWYSIWYGSwitch: React.FC<EditorWYSIWYGProps> = (props: EditorWYSIWYGProps) => {
  const { value } = props
  const { print } = useIsPrintRoute()

  if (print) {
    return (
      <div className="editorWYSIWYG jodit-wysiwyg textarea-print" dangerouslySetInnerHTML={{ __html: value || '' }} />
    )
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EditorWYSIWYGWithRepositoryContext {...props} />
}

export default EditorWYSIWYGSwitch
