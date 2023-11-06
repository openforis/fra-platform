import './ProgressBar.scss'
import React from 'react'

import { Numbers } from 'utils/numbers'

type Props = {
  completed: number
}

const ProgressBar: React.FC<Props> = (props) => {
  const { completed: _completed } = props

  const completed = Numbers.format(Math.min(_completed, 100), 0)

  return (
    <div className="progress-bar">
      <div className="progress-bar__filler" style={{ width: `${completed}%` }}>
        <span className="progress-bar__label">{`${completed} %`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
