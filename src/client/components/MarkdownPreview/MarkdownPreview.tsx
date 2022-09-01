import React from 'react'

import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

type Props = {
  value: string
}

const MarkdownPreview: React.FC<Props> = (props) => {
  const { value } = props
  return <MDEditor.Markdown rehypePlugins={[rehypeSanitize]} source={value} />
}

export default MarkdownPreview
