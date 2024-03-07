import './ProgressBar.scss'
import React from 'react'

type Props = {
  loaded: number
  total: number
}

const ProgressBar: React.FC<Props> = (props) => {
  const { loaded, total } = props

  const completed = Math.floor((loaded / total) * 100)

  return (
    <div className="progress-bar">
      <div className="progress-bar__filler" style={{ width: `${completed}%` }}>
        <span className="progress-bar__label">{`${completed} %`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
