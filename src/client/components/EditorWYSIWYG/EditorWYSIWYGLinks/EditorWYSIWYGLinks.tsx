import './EditorWYSIWYGLinks.scss'
import React from 'react'

import { InvalidLink } from 'meta/assessment/validation/validation'

import { useIsPrintRoute } from 'client/hooks/routes'
import EditorWYSIWYGReadOnly from 'client/components/EditorWYSIWYG/EditorWYSIWYGReadOnly'

import EditorWYSIWYGWithRepositoryContext from '../EditorWYSIWYGWithRepositoryContext'

type Props = {
  disabled?: boolean
  focusedLink?: string
  id?: string
  invalidLinks?: Array<InvalidLink>
  onChange: (value?: string) => void
  repository?: boolean
  validationErrors?: Array<string>
  value: string
}
const EditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { disabled, focusedLink, id, invalidLinks, onChange, repository, validationErrors, value } = props
  const { print } = useIsPrintRoute()

  if (print) {
    return <EditorWYSIWYGReadOnly value={value} />
  }

  return (
    <EditorWYSIWYGWithRepositoryContext
      className="editor-wysiwyg-links"
      disabled={disabled}
      focusedLink={focusedLink}
      id={id}
      invalidLinks={invalidLinks}
      onChange={onChange}
      onlyLinks
      repository={repository}
      validationErrors={validationErrors}
      value={value}
    />
  )
}

export default EditorWYSIWYGLinks
