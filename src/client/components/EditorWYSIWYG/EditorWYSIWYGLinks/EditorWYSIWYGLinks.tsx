import React, { useState } from 'react'

import EditorWYSIWYG from 'client/components/EditorWYSIWYG/EditorWYSIWYG'
import AddFromRepository from 'client/components/EditorWYSIWYG/EditorWYSIWYGLinks/AddFromRepository'

import { useEditorOptions } from './hooks/useEditorOptions'
import { useOnClose } from './hooks/useOnClose'
import { Props } from './props'

const EditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { onChange, value } = props
  const [editor, setEditor] = useState(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClose = useOnClose({ setIsOpen, setEditor, editor })
  const editorOptions = useEditorOptions({ setIsOpen, setEditor })

  return (
    <>
      <EditorWYSIWYG onChange={onChange} options={editorOptions} value={value} />
      <AddFromRepository isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default EditorWYSIWYGLinks
