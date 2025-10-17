import React, { useEffect, useRef, useState, useTransition } from 'react'

import { useGetExplorerSectionMetadata } from 'client/store/explorer/metadata/hooks/metadata'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Filters from 'client/pages/Explorer/Filters/Filters'

import ResultGrid from './ResultGrid/ResultGrid'

const Explorer: React.FC = () => {
  useGetExplorerSectionMetadata()
  const gridRef = useRef<HTMLDivElement>(null)
  const { sectionName } = useSectionRouteParams()

  const [gridSection, setGridSection] = useState(sectionName)

  const [, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      setGridSection(sectionName)
    })
  }, [sectionName])

  const showGrid = gridSection === sectionName

  return (
    <div className="app-view__content">
      <Filters gridRef={gridRef} />
      {/* Unmount ResulsGrid when switching sections to avoid expensive re-renders */}
      {showGrid && <ResultGrid key={gridSection} gridRef={gridRef} />}
    </div>
  )
}

export default Explorer
