import './ProgressBar.scss'
import React from 'react'

type Props = {
  loaded: number
  total: number
}

const ProgressBar: React.FC<Props> = (props: Props) => {
  const { loaded, total } = props
  return (
    <div className="progress-bar">
      <div className="progress-bar__loaded" style={{ width: `${(loaded / total) * 100}%` }} />
    </div>
  )
}

export default ProgressBar
