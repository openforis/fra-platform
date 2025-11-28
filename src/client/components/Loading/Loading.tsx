import './Loading.scss'
import React from 'react'

import { AssessmentNames } from 'meta/assessment/assessment'

const Loading: React.FC = () => {
  // Toucan is hidden in PanEuropean pages.
  const { pathname } = window.location
  const showToucan = !pathname.includes(AssessmentNames.panEuropean)

  return (
    <div className="loading" style={{ minHeight: '90vh' }}>
      {showToucan && <img alt="tucan" src="/img/tucan.svg" />}

      <p className="subhead">
        <strong>Loading... </strong>
      </p>
    </div>
  )
}

export default Loading
