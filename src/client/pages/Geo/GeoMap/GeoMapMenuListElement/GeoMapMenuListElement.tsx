import './GeoMapMenuListElement.scss'
import React from 'react'

import classNames from 'classnames'

import { LayerStatus } from 'meta/geo'

interface Props {
  title: string
  tabIndex: number
  checked?: boolean
  onCheckboxClick?: () => void
  backgroundColor?: string
  loadingStatus?: string
}

const GeoMenuItem: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  tabIndex,
  checked,
  onCheckboxClick,
  children,
  backgroundColor,
  loadingStatus,
}) => {
  let checkBoxContent = null
  if (loadingStatus === LayerStatus.loading) {
    checkBoxContent = <div className="loading-spinner" />
  } else if (loadingStatus === LayerStatus.failed) {
    checkBoxContent = <div className={classNames('fra-checkbox', 'failed')} />
  } else {
    checkBoxContent = <div className={classNames('fra-checkbox', { checked })} />
  }
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
              {checkBoxContent}
              <p>{title}</p>
            </div>
          ) : (
            <div>
              <p>{title}</p>
            </div>
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
  loadingStatus: null,
}

export default GeoMenuItem
