import './statisticalFactsheets.less'
import React from 'react'
import Header from '@webapp/app/components/header/header'

import ForestArea from './ForestArea'
import CarbonGrowingStock from './CarbonGrowingStock'
import ForestAreaPercent from './ForestAreaPercent'
import PrimaryForest from './PrimaryForest'
import ForestOwnership from './ForestOwnership'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'

const StatisticalFactsheets = () => {
  return (
    <>
      <Header hideNavigationControl hideLinks />
      <div className="statistical-factsheets">
        <ForestArea />
        <CarbonGrowingStock />

        <ForestAreaPercent />
        <PrimaryForest />
        <ForestOwnership />

        <ForestAreaWithinProtectedAreas />
        <NaturallyRegeneratingForest />
        <PrimaryDesignatedManagementObjective />
      </div>
    </>
  )
}

export default StatisticalFactsheets
