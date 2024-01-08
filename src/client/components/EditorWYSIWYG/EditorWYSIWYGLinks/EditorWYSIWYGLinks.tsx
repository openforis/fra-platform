import React, { useState } from 'react'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG/EditorWYSIWYG'
import AddFromRepository from 'client/components/EditorWYSIWYG/EditorWYSIWYGLinks/AddFromRepository'
import MarkdownPreview from 'client/components/MarkdownPreview'

import { useEditorOptions } from './hooks/useEditorOptions'
import { useOnClose } from './hooks/useOnClose'
import type { Props } from './props'

const EditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { onChange, value, disabled } = props
  const [editor, setEditor] = useState(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClose = useOnClose({ setIsOpen, setEditor, editor })
  const editorOptions = useEditorOptions({ setIsOpen, setEditor })

  if (disabled) {
    return (
      <div className="input-container">
        <MarkdownPreview value={value} />
      </div>
    )
  }

  return (
    <>
      <EditorWYSIWYG onChange={onChange} options={editorOptions} value={value} />
      <AddFromRepository isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default EditorWYSIWYGLinks
