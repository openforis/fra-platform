import './Filters.scss'
import React from 'react'

import Hr from 'client/components/Hr/Hr'
import ExportButton from 'client/pages/Explorer/ExportButton/ExportButton'
import Country from 'client/pages/Explorer/Filters/Country/Country'
import Dimension from 'client/pages/Explorer/Filters/Dimension/Dimension'
import Measure from 'client/pages/Explorer/Filters/Measure/Measure'

const Filters: React.FC = () => {
  return (
    <div className="explorer-filters">
      <ExportButton />
      <Hr vertical />
      <Country />
      <Measure />
      <Dimension />
    </div>
  )
}

export default Filters
