import React from 'react'

import { SelectedFilesProvider } from 'client/context/selectedFilesContext'

import Panel from './Panel'

const WrappedPanel: React.FC = () => {
  return (
    <SelectedFilesProvider>
      <Panel />
    </SelectedFilesProvider>
  )
}

export default WrappedPanel
