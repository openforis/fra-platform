import React from 'react'

import * as PanEuropean from '@common/assessment/panEuropean'

const Loading = () => {
  // Toucan is hidden in PanEuropean pages.
  const { pathname } = window.location
  const showToucan = !pathname.includes(PanEuropean.type)

  return (
    <div className="notfound" style={{ minHeight: '90vh' }}>
      {showToucan && <img src="/img/tucan.svg" alt="tucan" />}

      <p className="subhead">
        <strong>Loading... </strong>
      </p>
    </div>
  )
}

export default Loading
