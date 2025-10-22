import './Filters.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import Hr from 'client/components/Hr/Hr'
import ExportButton from 'client/pages/Explorer/ExportButton/ExportButton'
import Countries from 'client/pages/Explorer/Filters/Countries'
import Dimensions from 'client/pages/Explorer/Filters/Dimensions'
import Measures from 'client/pages/Explorer/Filters/Measures'
import Options from 'client/pages/Explorer/Filters/Options'
import { ExplorerGridProps } from 'client/pages/Explorer/types'
import { Breakpoints } from 'client/utils'

const Filters: React.FC<ExplorerGridProps> = (props: ExplorerGridProps) => {
  const { gridRef } = props

  return (
    <div className="explorer-filters">
      <Countries />
      <Measures />
      <Dimensions />
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
