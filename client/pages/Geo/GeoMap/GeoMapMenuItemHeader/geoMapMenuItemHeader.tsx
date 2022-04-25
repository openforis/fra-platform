import './geoMapMenuItemHeader.scss'
import React, { useCallback } from 'react'

import Icon from '@client/components/Icon'

interface Props {
  title: string
  isOpen: boolean
  tabIndex: number
  onExpandClick: (isOpen: boolean) => void
  checked?: boolean
  onCheckboxClick?: () => void
}

const GeoMapMenuItemHeader: React.FC<Props> = ({
  title,
  isOpen,
  tabIndex,
  onExpandClick,
  checked,
  onCheckboxClick,
}) => {
  const handleExpandClick = useCallback(() => {
    onExpandClick(!isOpen)
  }, [isOpen])

  return (
    <div className="geo-map-menu-item-header">
      {checked !== null ? (
        <div
          className="geo-map-menu-item-header-checkbox"
          role="checkbox"
          aria-checked={checked}
          tabIndex={tabIndex}
          onClick={onCheckboxClick}
          onKeyDown={onCheckboxClick}
        >
          <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
          <p className="geo-map-menu-item-header-title">{title}</p>
        </div>
      ) : (
        <p className="geo-map-menu-item-header-title">{title}</p>
      )}
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

GeoMapMenuItemHeader.defaultProps = {
  checked: null,
  onCheckboxClick: null,
}

export default GeoMapMenuItemHeader
