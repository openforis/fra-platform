import React from 'react'

import { SelectedFilesProvider } from './context/selectedFilesContext'
import EditorWYSIWYGLinks from './EditorWYSIWYGLinks'
import type { Props } from './props'

const WrappedEditorWYSIWYGLinks: React.FC<Props> = (props: Props) => {
  const { disabled, onChange, value, repository } = props
  return (
    <SelectedFilesProvider>
      <EditorWYSIWYGLinks disabled={disabled} onChange={onChange} repository={repository} value={value} />
    </SelectedFilesProvider>
  )
}

export default WrappedEditorWYSIWYGLinks
