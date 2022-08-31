import './geoMapMenuListElement.scss'
import React from 'react'

import classNames from 'classnames'

interface Props {
  title: string
  tabIndex: number
  checked?: boolean
  onCheckboxClick?: () => void
}

const GeoMenuItem: React.FC<Props> = ({ title, tabIndex, checked, onCheckboxClick }) => {
  return (
    <div>
      <div className="geo-map-menu-list-element">
        {checked !== null ? (
          <div
            className="geo-map-menu-list-element-checkbox"
            role="checkbox"
            aria-checked={checked}
            tabIndex={tabIndex}
            onClick={onCheckboxClick}
            onKeyDown={onCheckboxClick}
          >
            <div className={classNames('fra-checkbox', { checked })} />
            <p className="geo-map-menu-list-element-checkbox">{title}</p>
          </div>
        ) : (
          <p className="geo-map-menu-list-element-title">{title}</p>
        )}
      </div>
    </div>
  )
}

GeoMenuItem.defaultProps = {
  checked: null,
  onCheckboxClick: null,
}

export default GeoMenuItem
