import './statisticalFactsheets.less'
import React from 'react'
import { useParams } from 'react-router'

import { Area } from '@common/country'

import ForestArea from './ForestArea'
import CarbonGrowingStock from './CarbonGrowingStock'
import ForestAreaPercent from './ForestAreaPercent'
import PrimaryForest from './PrimaryForest'
import ForestOwnership from './ForestOwnership'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'

const StatisticalFactsheets = () => {
  const { countryIso: levelIso }: any = useParams()
  const isCountry = Area.isISOCountry(levelIso)
  return (
    <div className={`statistical-factsheets${isCountry ? ' country' : ''}`}>
      <ForestArea levelIso={levelIso} />
      <CarbonGrowingStock levelIso={levelIso} />

      <ForestAreaPercent levelIso={levelIso} />
      <PrimaryForest levelIso={levelIso} />

      <ForestAreaWithinProtectedAreas levelIso={levelIso} />
      <ForestOwnership levelIso={levelIso} />

      <PrimaryDesignatedManagementObjective levelIso={levelIso} />
      <NaturallyRegeneratingForest levelIso={levelIso} />
    </div>
  )
}

export default StatisticalFactsheets
