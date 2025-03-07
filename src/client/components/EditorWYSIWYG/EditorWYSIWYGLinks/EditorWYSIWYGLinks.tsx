import '../EditorWYSIWYG.scss'
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
  const { onChange, value, disabled, repository } = props
  const { print } = useIsPrintRoute()

  if (print) {
    return <EditorWYSIWYGReadOnly value={value} />
  }

  return (
    <EditorWYSIWYGWithRepositoryContext
      disabled={disabled}
      onChange={onChange}
      onlyLinks
      repository={repository}
      value={value}
    />
  )
}

export default EditorWYSIWYGLinks
