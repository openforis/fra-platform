import './Explorer.scss'
import React, { useRef } from 'react'

import { useGetExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import Filters from 'client/pages/Explorer/Filters/Filters'

import ResultGrid from './ResultGrid/ResultGrid'

const Explorer: React.FC = () => {
  useGetExplorerSectionMetadata()
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="app-view__content">
      <Filters gridRef={gridRef} />
      <ResultGrid gridRef={gridRef} />
    </div>
  )
}

export default Explorer
