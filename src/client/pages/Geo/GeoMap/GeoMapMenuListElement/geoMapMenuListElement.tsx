import './geoMapMenuListElement.scss'
import React from 'react'

import classNames from 'classnames'

interface Props {
  title: string
  tabIndex: number
  disabled: boolean
  /* apiObject?: string */
  checked?: boolean
  onCheckboxClick?: () => void
}

const GeoMenuItem: React.FC<Props> = ({ title, tabIndex, checked, disabled, onCheckboxClick }) => {
  return (
    <div>
      <div className={classNames('geo-map-menu-list-element', { disabled })}>
        {checked !== null ? (
          <div
            className="geo-map-menu-list-element-checkbox"
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={tabIndex}
            onClick={onCheckboxClick}
            onKeyDown={onCheckboxClick}
          >
            <div className={classNames('fra-checkbox', { checked })} />
            <p className="geo-map-menu-list-element-checkbox">{title}</p>
          </div>
        ) : (
          <div>
            <p className="geo-map-menu-list-element-title">{title}</p>
          </div>
        )}
      </div>
    </div>
  )
}

GeoMenuItem.defaultProps = {
  checked: null,
  onCheckboxClick: null,
  /* apiObject: null, */
}

export default GeoMenuItem
