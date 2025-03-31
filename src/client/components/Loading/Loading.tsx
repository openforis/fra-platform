import React from 'react'

import { AssessmentNames } from 'meta/assessment/assessment'

const Loading = () => {
  // Toucan is hidden in PanEuropean pages.
  const { pathname } = window.location
  const showToucan = !pathname.includes(AssessmentNames.panEuropean)

  return (
    <div className="notfound" style={{ minHeight: '90vh' }}>
      {showToucan && <img alt="tucan" src="/img/tucan.svg" />}

      <p className="subhead">
        <strong>Loading... </strong>
      </p>
    </div>
  )
}

export default Loading
