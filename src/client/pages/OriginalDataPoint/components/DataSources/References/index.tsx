import React from 'react'

import { SelectedFilesProvider } from './context/selectedFilesContext'
import { Props } from './Props'
import References from './References'

const WrappedReferences: React.FC<Props> = (props: Props) => {
  const { originalDataPoint } = props

  return (
    <SelectedFilesProvider>
      <References originalDataPoint={originalDataPoint} />
    </SelectedFilesProvider>
  )
}

export default WrappedReferences
