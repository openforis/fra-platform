import './Filters.scss'
import React from 'react'

import Hr from 'client/components/Hr/Hr'
import ExportButton from 'client/pages/Explorer/ExportButton/ExportButton'
import Country from 'client/pages/Explorer/Filters/Country/Country'
import Dimension from 'client/pages/Explorer/Filters/Dimension/Dimension'
import Measure from 'client/pages/Explorer/Filters/Measure/Measure'
import Options from 'client/pages/Explorer/Filters/Options/Options'
import { ExplorerGridProps } from 'client/pages/Explorer/types'

const Filters: React.FC<ExplorerGridProps> = (props: ExplorerGridProps) => {
  const { gridRef } = props

  return (
    <div className="explorer-filters">
      <ExportButton gridRef={gridRef} />
      <Hr vertical />
      <Country />
      <Measure />
      <Dimension />
      <Hr vertical />
      <Options />
    </div>
  )
}

export default Filters
