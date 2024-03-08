import './GeoSection.scss'
import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  children: ReactElement
  labelKey: string
}

const GeoSection: React.FC<Props> = (props) => {
  const { children, labelKey } = props

  const { t } = useTranslation()
  const label = t(labelKey)

  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <button
        aria-label={label}
        className="nav-geo-section__header"
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => setExpanded(!expanded)}
        tabIndex={0}
        type="button"
      >
        <span className="nav-geo-section__label">{label}</span>
      </button>
      <div className={`nav-geo-section__items nav-geo-section__items-${expanded ? 'visible' : 'hidden'}`}>
        {expanded && children}
      </div>
    </div>
  )
}

export default GeoSection
