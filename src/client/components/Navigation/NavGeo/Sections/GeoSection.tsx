import './GeoSection.scss'
import React, { ReactElement, useState } from 'react'

type Props = {
  children: ReactElement
  label: string
}

const GeoSection: React.FC<Props> = (props) => {
  const { children, label } = props

  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div
        aria-label={label}
        className="nav-geo-section__header"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
      >
        <div className="nav-geo-section__label">{label}</div>
      </div>
      <div className={`nav-geo-section__items nav-geo-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded && children}
      </div>
    </div>
  )
}

export default GeoSection
