import './statisticalFactsheets.less'
import React from 'react'
import Header from '@webapp/app/components/header/header'

import ForestArea from './ForestArea'

const StatisticalFactsheets = () => {
  return (
    <>
      <Header hideNavigationControl hideLinks />
      <div className="statistical-factsheets">
        <ForestArea />
      </div>
    </>
  )
}

export default StatisticalFactsheets
