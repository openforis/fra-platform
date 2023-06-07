import React from 'react'

import { AssessmentNames } from 'meta/assessment'

const Loading = () => {
  // Toucan is hidden in PanEuropean pages.
  const { pathname } = window.location
  const showToucan = !pathname.includes(AssessmentNames.panEuropean)

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
