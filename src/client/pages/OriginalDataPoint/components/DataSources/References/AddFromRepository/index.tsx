import React from 'react'

import { SelectedFilesProvider } from './context/selectedFilesContext'
import AddFromRepository from './AddFromRepository'
import { Props } from './Props'

export default (props: Props): JSX.Element => {
  const { isOpen, onClose } = props
  return (
    <SelectedFilesProvider>
      <AddFromRepository isOpen={isOpen} onClose={onClose} />
    </SelectedFilesProvider>
  )
}
