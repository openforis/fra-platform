import React from 'react'

import MDEditor, { commands, ContextStore } from '@uiw/react-md-editor'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

type Props = {
  value: string
  onChange: (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void
}

const defaultCommands = [
  commands.title,
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.hr,
  commands.divider,
  commands.link,
  commands.orderedListCommand,
  commands.unorderedListCommand,
  commands.checkedListCommand,
]

const MarkdownEditor: React.FC<Props> = (props) => {
  const { value, onChange } = props
  return (
    <MDEditor
      commands={defaultCommands}
      previewOptions={{
        rehypePlugins: [rehypeRaw, rehypeSanitize],
      }}
      value={value}
      onChange={onChange}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  )
}

export default MarkdownEditor
