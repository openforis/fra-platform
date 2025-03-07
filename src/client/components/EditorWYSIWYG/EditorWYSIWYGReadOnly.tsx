import React from 'react'

import { EditorWYSIWYGProps } from 'client/components/EditorWYSIWYG/EditorWYSIWYG'

type Props = {
  value: EditorWYSIWYGProps['value']
}

const EditorWYSIWYGReadOnly: React.FC<Props> = (props: Props) => {
  const { value } = props

  return (
    <div className="editorWYSIWYG jodit-wysiwyg read-only-html" dangerouslySetInnerHTML={{ __html: value || '' }} />
  )
}

export default EditorWYSIWYGReadOnly
