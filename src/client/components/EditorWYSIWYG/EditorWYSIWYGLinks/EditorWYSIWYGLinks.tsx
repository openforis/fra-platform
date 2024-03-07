import React, { useState } from 'react'

import { Jodit } from 'jodit-react'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG/EditorWYSIWYG'
import AddFromRepository from 'client/components/EditorWYSIWYG/EditorWYSIWYGLinks/AddFromRepository'

import { useEditorOptions } from './hooks/useEditorOptions'
import { useOnClose } from './hooks/useOnClose'
import type { Props } from './props'

const EditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { onChange, value, disabled, repository } = props

  const [editor, setEditor] = useState<Jodit>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClose = useOnClose({ setIsOpen, setEditor, editor })
  const editorOptions = useEditorOptions({ setIsOpen, setEditor, repository })

  return (
    <>
      <EditorWYSIWYG disabled={disabled} onChange={onChange} options={editorOptions} value={value} />
      <AddFromRepository isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default EditorWYSIWYGLinks
