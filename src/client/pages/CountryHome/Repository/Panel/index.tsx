import React from 'react'

import { FileUploadProvider } from 'client/components/FileUpload'

import Panel from './Panel'

const WrappedPanel: React.FC = () => {
  return (
    <FileUploadProvider>
      <Panel />
    </FileUploadProvider>
  )
}

export default WrappedPanel
