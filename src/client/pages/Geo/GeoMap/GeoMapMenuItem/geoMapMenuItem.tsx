import './geoMapMenuItem.scss'
import React, { useCallback, useState } from 'react'

import classNames from 'classnames'

import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import Icon from 'client/components/Icon'

interface Props {
  title: string
  tabIndex: number
  checked?: boolean
  onCheckboxClick?: () => void
  loadingStatus?: string
}

const GeoMenuItem: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  tabIndex,
  checked,
  onCheckboxClick,
  children,
  loadingStatus,
}) => {
  let checkBoxContent = null
  if (loadingStatus === LayerFetchStatus.Loading) {
    checkBoxContent = <div className="loading-spinner" />
  } else if (loadingStatus === LayerFetchStatus.Failed) {
    checkBoxContent = <div className={classNames('fra-checkbox', 'failed')} />
  } else {
    checkBoxContent = <div className={classNames('fra-checkbox', { checked })} />
  }

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
            {checkBoxContent}
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
  loadingStatus: null,
}

export default GeoMenuItem
