import './satelliteSourceHeader.scss'
import React, { useCallback, useState } from 'react'

import Icon from '@client/components/Icon'

interface Props {
  title: string
  checked: boolean
  tabIndex: number
  onClick: () => void
}

const SatelliteSourceHeader: React.FC<Props> = ({ title, checked, tabIndex, onClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="geo-map-menu-mosaic-select-header">
      <div
        className="geo-map-menu-mosaic-select-checkbox"
        role="checkbox"
        aria-checked={checked}
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={onClick}
      >
        <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
        <p>{title}</p>
      </div>
      <div
        className="geo-map-menu-mosaic-icon-expand"
        role="button"
        onClick={handleClick}
        tabIndex={tabIndex - 2}
        onKeyDown={handleClick}
      >
        <Icon name={isOpen ? 'small-up' : 'small-down'} />
      </div>
    </div>
  )
}

export default SatelliteSourceHeader
