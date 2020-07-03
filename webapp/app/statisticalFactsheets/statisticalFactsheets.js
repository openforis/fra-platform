import './statisticalFactsheets.less'
import React from 'react'
import { Redirect, useParams } from 'react-router'
import * as BasePaths from '@webapp/main/basePaths'

import Header from '@webapp/app/components/header/header'

import ForestArea from './ForestArea'
import CarbonGrowingStock from './CarbonGrowingStock'
import ForestAreaPercent from './ForestAreaPercent'
import PrimaryForest from './PrimaryForest'
import ForestOwnership from './ForestOwnership'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'
import LevelSelection from './components/levelSelection'
import { levels } from './common/levels'

const StatisticalFactsheets = () => {
  const { levelIso } = useParams()

  if (!levelIso) {
    return <Redirect to={BasePaths.getStatisticalFactsheetsWithLevelIso(levels.global)} />
  }

  return (
    <>
      <Header hideNavigationControl hideLinks />
      <LevelSelection />
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
