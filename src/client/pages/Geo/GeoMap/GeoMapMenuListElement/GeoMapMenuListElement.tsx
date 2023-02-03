import './GeoMapMenuListElement.scss'
import React from 'react'

import classNames from 'classnames'

interface Props {
  title: string
  tabIndex: number
  checked?: boolean
  onCheckboxClick?: () => void
  backgroundColor?: string
}

const GeoMenuItem: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  tabIndex,
  checked,
  onCheckboxClick,
  children,
  backgroundColor,
}) => {
  return (
    <>
      <div className="geo-map-menu-list-element">
        <div className="geo-map-menu-item-title">
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
              <p>{title}</p>
            </div>
          ) : (
            <p>{title}</p>
          )}
        </div>
        {children}
      </div>
      <div className="geo-map-menu-list-element-bottom" />
    </>
  )
}

GeoMenuItem.defaultProps = {
  checked: null,
  onCheckboxClick: null,
  backgroundColor: null,
}

export default GeoMenuItem
