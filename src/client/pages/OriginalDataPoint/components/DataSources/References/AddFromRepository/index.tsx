import React from 'react'

import { SelectedFilesProvider } from './context/selectedFilesContext'
import AddFromRepository from './AddFromRepository'
import { Props } from './Props'

export default (props: Props) => (
  <SelectedFilesProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <AddFromRepository {...props} />
  </SelectedFilesProvider>
)
