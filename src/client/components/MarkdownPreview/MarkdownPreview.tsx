import React from 'react'

import MDEditor from '@uiw/react-md-editor'

type Props = {
  value: string
}

const MarkdownPreview: React.FC<Props> = (props) => {
  const { value } = props
  return <MDEditor.Markdown disallowedElements={['script']} source={value} />
}

export default MarkdownPreview
