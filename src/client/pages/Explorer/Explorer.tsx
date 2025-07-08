import './Explorer.scss'
import React from 'react'

import { useGetExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import Filters from 'client/pages/Explorer/Filters/Filters'

import ResultGrid from './ResultGrid/ResultGrid'

const Explorer: React.FC = () => {
  useGetExplorerSectionMetadata()

  return (
    <div className="app-view__content">
      <Filters />
      <ResultGrid />
    </div>
  )
}

export default Explorer
