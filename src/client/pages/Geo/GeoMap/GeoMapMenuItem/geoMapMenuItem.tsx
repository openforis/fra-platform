import './geoMapMenuItem.scss'
import React, { useCallback, useState } from 'react'

import classNames from 'classnames'

import Icon from '@client/components/Icon'

interface Props {
  title: string
  tabIndex: number
  checked?: boolean
  onCheckboxClick?: () => void
}

const GeoMenuItem: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  tabIndex,
  checked,
  onCheckboxClick,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleExpandClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div>
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
            <div className={classNames('fra-checkbox', { checked })} />
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
      {isOpen && children}
    </div>
  )
}

GeoMenuItem.defaultProps = {
  checked: null,
  onCheckboxClick: null,
}

export default GeoMenuItem
