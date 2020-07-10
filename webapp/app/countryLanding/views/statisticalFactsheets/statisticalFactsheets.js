import './statisticalFactsheets.less'
import React from 'react'
import { useParams } from 'react-router'

import ForestArea from './ForestArea'
import CarbonGrowingStock from './CarbonGrowingStock'
import ForestAreaPercent from './ForestAreaPercent'
import PrimaryForest from './PrimaryForest'
import ForestOwnership from './ForestOwnership'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'

const StatisticalFactsheets = () => {
  const { countryIso: levelIso } = useParams()

  return (
    <>
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
