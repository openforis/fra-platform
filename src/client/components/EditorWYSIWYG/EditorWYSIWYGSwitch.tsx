import './EditorWYSIWYG.scss'
import React from 'react'

import { useIsPrintRoute } from 'client/hooks/routes'
import EditorWYSIWYGReadOnly from 'client/components/EditorWYSIWYG/EditorWYSIWYGReadOnly'

import { EditorWYSIWYGProps } from './EditorWYSIWYG'
import EditorWYSIWYGWithRepositoryContext from './EditorWYSIWYGWithRepositoryContext'

const EditorWYSIWYGSwitch: React.FC<EditorWYSIWYGProps> = (props: EditorWYSIWYGProps) => {
  const { value } = props
  const { print } = useIsPrintRoute()

  if (print) {
    return <EditorWYSIWYGReadOnly value={value} />
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EditorWYSIWYGWithRepositoryContext {...props} />
}

export default EditorWYSIWYGSwitch
