import './ExportButton.scss'
import React from 'react'

import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { ButtonGridExport } from 'client/components/DataGrid'
import { useHideGrid } from 'client/pages/Explorer/hooks/useHideGrid'
import { ExplorerGridProps } from 'client/pages/Explorer/types'

const ExportButton: React.FC<ExplorerGridProps> = (props: ExplorerGridProps) => {
  const { gridRef } = props
  const { sectionName } = useSectionRouteParams()
  const filename = `dataExport-${sectionName}`
  const hideGrid = useHideGrid()

  return <ButtonGridExport disabled={hideGrid} filename={filename} gridRef={gridRef} />
}

export default ExportButton
