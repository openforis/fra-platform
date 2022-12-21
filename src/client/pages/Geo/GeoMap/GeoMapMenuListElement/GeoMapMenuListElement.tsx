import './GeoMapMenuListElement.scss'
import React from 'react'

import classNames from 'classnames'

interface Props {
  title: string
  tabIndex: number
  checked?: boolean
  onCheckboxClick?: () => void
  children?: JSX.Element
  backgroundColor?: string
}

const GeoMenuItem: React.FC<Props> = ({ title, tabIndex, checked, onCheckboxClick, children, backgroundColor }) => {
  return (
    <div>
      <div className="geo-map-menu-list-element">
        {checked !== null ? (
          <div
            className={`geo-map-menu-list-element-checkbox ${backgroundColor}`}
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
      <div className="geo-map-menu-list-element-bottom">{children}</div>
    </div>
  )
}

GeoMenuItem.defaultProps = {
  checked: null,
  onCheckboxClick: null,
  children: null,
  backgroundColor: null,
}

export default GeoMenuItem
