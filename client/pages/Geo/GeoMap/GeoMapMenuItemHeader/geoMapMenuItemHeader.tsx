import './geoMapMenuItemHeader.scss'
import React, { useCallback } from 'react'

import Icon from '@client/components/Icon'

interface Props {
  title: string
  checked: boolean
  isOpen: boolean
  tabIndex: number
  onCheckboxClick: () => void
  onExpandClick: (isOpen: boolean) => void
}

const GeoMapMenuItemHeader: React.FC<Props> = ({
  title,
  checked,
  isOpen,
  tabIndex,
  onCheckboxClick,
  onExpandClick,
}) => {
  const handleExpandClick = useCallback(() => {
    onExpandClick(!isOpen)
  }, [isOpen])

  return (
    <div className="geo-map-menu-item-header">
      <div
        className="geo-map-menu-item-header-checkbox"
        role="checkbox"
        aria-checked={checked}
        tabIndex={tabIndex}
        onClick={onCheckboxClick}
        onKeyDown={onCheckboxClick}
      >
        <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
        <p>{title}</p>
      </div>
      <div
        className="geo-map-menu-item-header-icon-expand"
        role="button"
        onClick={handleExpandClick}
        tabIndex={tabIndex - 1}
        onKeyDown={handleExpandClick}
      >
        <Icon name={isOpen ? 'small-up' : 'small-down'} />
      </div>
    </div>
  )
}

export default GeoMapMenuItemHeader
