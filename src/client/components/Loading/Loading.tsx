import './Loading.scss'
import React from 'react'

import { AssessmentNames } from 'meta/assessment'

import ProgressBar from 'client/components/ProgressBar'

type Props = {
  completed?: number
}

const Loading = (props: Props) => {
  const { completed } = props

  // Toucan is hidden in PanEuropean pages.
  const { pathname } = window.location
  const showToucan = !pathname.includes(AssessmentNames.panEuropean)

  return (
    <div className="loading" style={{ minHeight: '90vh' }}>
      {showToucan && <img src="/img/tucan.svg" alt="tucan" />}

      {completed >= 0 ? (
        <ProgressBar completed={completed} />
      ) : (
        <p className="subhead">
          <strong>Loading... </strong>
        </p>
      )}
    </div>
  )
}

Loading.defaultProps = {
  completed: undefined,
}

export default Loading
