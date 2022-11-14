import React from 'react'

import MDEditor, { commands, ContextStore } from '@uiw/react-md-editor'

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
        rehypePlugins: [],
      }}
      value={value}
      onChange={onChange}
    />
  )
}

export default MarkdownEditor
