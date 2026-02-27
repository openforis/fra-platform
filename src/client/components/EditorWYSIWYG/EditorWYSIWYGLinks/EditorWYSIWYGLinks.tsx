import './EditorWYSIWYGLinks.scss'
import React from 'react'

import { useIsPrintRoute } from 'client/hooks/routes'
import EditorWYSIWYGReadOnly from 'client/components/EditorWYSIWYG/EditorWYSIWYGReadOnly'

import EditorWYSIWYGWithRepositoryContext from '../EditorWYSIWYGWithRepositoryContext'

type Props = {
  disabled?: boolean
  id?: string
  onChange: (value?: string) => void
  repository?: boolean
  value: string
}
const EditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { disabled, id, onChange, repository, value } = props
  const { print } = useIsPrintRoute()

  if (print) {
    return <EditorWYSIWYGReadOnly value={value} />
  }

  return (
    <EditorWYSIWYGWithRepositoryContext
      className="editor-wysiwyg-links"
      disabled={disabled}
      id={id}
      onChange={onChange}
      onlyLinks
      repository={repository}
      value={value}
    />
  )
}

export default EditorWYSIWYGLinks
