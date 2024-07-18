import React from 'react'

import EditorWYSIWYGWithRepositoryContext from 'client/components/EditorWYSIWYG/EditorWYSIWYGWithRepositoryContext'

type Props = {
  disabled?: boolean
  onChange: (value?: string) => void
  repository?: boolean
  value: string
}
const EditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { onChange, value, disabled, repository } = props

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

EditorWYSIWYGLinks.defaultProps = {
  disabled: false,
  repository: false,
}

export default EditorWYSIWYGLinks
