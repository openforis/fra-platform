import './Filters.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import Hr from 'client/components/Hr/Hr'
import ExportButton from 'client/pages/Explorer/ExportButton/ExportButton'
import Country from 'client/pages/Explorer/Filters/Country/Country'
import Dimension from 'client/pages/Explorer/Filters/Dimension/Dimension'
import Measure from 'client/pages/Explorer/Filters/Measure/Measure'
import Options from 'client/pages/Explorer/Filters/Options/Options'
import { ExplorerGridProps } from 'client/pages/Explorer/types'
import { Breakpoints } from 'client/utils'

const Filters: React.FC<ExplorerGridProps> = (props: ExplorerGridProps) => {
  const { gridRef } = props

  return (
    <div className="explorer-filters">
      <Country />
      <Measure />
      <Dimension />
      <MediaQuery minWidth={Breakpoints.laptop}>
        <Hr vertical />
      </MediaQuery>
      <div className="explorer-filters__actions">
        <Options />
        <Hr vertical />
        <ExportButton gridRef={gridRef} />
      </div>
    </div>
  )
}

export default Filters
