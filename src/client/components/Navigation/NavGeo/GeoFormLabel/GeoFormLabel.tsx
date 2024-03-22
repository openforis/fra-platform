import './GeoFormLabel.scss'
import React, { PropsWithChildren } from 'react'

const GeoFormLabel: React.FC<PropsWithChildren> = (props) => {
  const { children } = props
  return <div className="geo-form-label">{React.Children.toArray(children)}</div>
}

export default GeoFormLabel
