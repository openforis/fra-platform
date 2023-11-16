// export { default } from './AddFromRepository'
// wrap with context:
// <SelectedFilesProvider>
import React from 'react'
import { SelectedFilesProvider } from './context/selectedFilesContext'
import AddFromRepository from './AddFromRepository'

export default (props) => (
  <SelectedFilesProvider>
    <AddFromRepository {...props} />
  </SelectedFilesProvider>
)
