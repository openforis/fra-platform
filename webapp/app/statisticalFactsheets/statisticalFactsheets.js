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
  const levelIso = 'WO' // This is now hardcoded

  return (
    <>
      <Header hideNavigationControl hideLinks />
      <div className="statistical-factsheets">
        <ForestArea levelIso={levelIso} />
        <CarbonGrowingStock levelIso={levelIso} />

        <ForestAreaPercent levelIso={levelIso} />
        <PrimaryForest levelIso={levelIso} />
        <ForestOwnership levelIso={levelIso} />

        <ForestAreaWithinProtectedAreas levelIso={levelIso} />
        <NaturallyRegeneratingForest levelIso={levelIso} />
        <PrimaryDesignatedManagementObjective levelIso={levelIso} />
      </div>
    </>
  )
}

export default StatisticalFactsheets
