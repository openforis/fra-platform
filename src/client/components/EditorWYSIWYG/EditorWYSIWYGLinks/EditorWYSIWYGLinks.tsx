import './EditorWYSIWYGLinks.scss'
import React from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import EditorWYSIWYGReadOnly from 'client/components/EditorWYSIWYG/EditorWYSIWYGReadOnly'

import EditorWYSIWYGWithRepositoryContext from '../EditorWYSIWYGWithRepositoryContext'

type Props = {
  disabled?: boolean
  onChange: (value?: string) => void
  repository?: boolean
  value: string
}
const EditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { disabled, onChange, repository, value } = props
  const { print } = useIsPrintRoute()

  if (print) {
    return <EditorWYSIWYGReadOnly value={value} />
  }

  return (
    <EditorWYSIWYGWithRepositoryContext
      className="editor-wysiwyg-links"
      disabled={disabled}
      onChange={onChange}
      onlyLinks
      repository={repository}
      value={value}
    />
  )
}

export default EditorWYSIWYGLinks
