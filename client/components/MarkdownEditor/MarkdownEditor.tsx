import React from 'react'

import MDEditor, { ContextStore } from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

type Props = {
  value: string
  onChange: (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void
}

const MarkdownEditor: React.FC<Props> = (props) => {
  const { value, onChange } = props
  return (
    <MDEditor
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      value={value}
      onChange={onChange}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  )
}

export default MarkdownEditor
