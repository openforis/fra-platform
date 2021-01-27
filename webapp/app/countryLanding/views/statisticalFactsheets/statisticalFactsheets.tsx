import './statisticalFactsheets.less'
import React from 'react'
import { useParams } from 'react-router'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'countryIso' does not exist on type '{}'.
  const { countryIso: levelIso } = useParams()
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
