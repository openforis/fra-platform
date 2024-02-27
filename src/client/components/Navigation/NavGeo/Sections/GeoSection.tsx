import './GeoSection.scss'
import React, { ReactElement, useState } from 'react'

type Props = {
  children: ReactElement
  sectionLabel: string
}

const GeoSection: React.FC<Props> = (props) => {
  const { children, sectionLabel } = props

  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div
        aria-label={sectionLabel}
        className="nav-geo-section__header"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
      >
        <div className="nav-geo-section__label">{sectionLabel}</div>
      </div>
      <div className={`nav-geo-section__items nav-geo-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded && children}
      </div>
    </div>
  )
}

export default GeoSection
