import React from 'react'

import MDEditor from '@uiw/react-md-editor'
import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'

type Props = {
  value: string
}

const MarkdownPreview: React.FC<Props> = (props) => {
  const { value } = props
  return <MDEditor.Markdown rehypePlugins={[rehypeParse, rehypeSanitize]} source={value} />
}

export default MarkdownPreview
