import './statisticalFactsheets.less'
import React from 'react'
import Header from '@webapp/app/components/header/header'

import ForestArea from './ForestArea'
import CarbonGrowingStock from './CarbonGrowingStock'
import ForestAreaPercent from './ForestAreaPercent'

const StatisticalFactsheets = () => {
  return (
    <>
      <Header hideNavigationControl hideLinks />
      <div className="statistical-factsheets">
        <ForestArea />
        <CarbonGrowingStock />

        <ForestAreaPercent />
      </div>
    </>
  )
}

export default StatisticalFactsheets
