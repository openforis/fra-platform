import React from 'react'

import MDEditor from '@uiw/react-md-editor'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

type Props = {
  value: string
}

const MarkdownPreview: React.FC<Props> = (props) => {
  const { value } = props
  return <MDEditor.Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]} source={value} />
}

export default MarkdownPreview
