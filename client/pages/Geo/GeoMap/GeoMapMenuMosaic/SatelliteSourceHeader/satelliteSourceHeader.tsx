import './satelliteSourceHeader.scss'
import React from 'react'

interface Props {
  title: string
  checked: boolean
  onClick: () => void
}

const SatelliteSourceHeader: React.FC<Props> = ({ title, checked, onClick }) => {
  return (
    <div
      className="geo-map-menu-mosaic-select-title"
      role="checkbox"
      aria-checked={checked}
      tabIndex={-1}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
      <p>{title}</p>
    </div>
  )
}

export default SatelliteSourceHeader
