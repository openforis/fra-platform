import './satelliteSourceHeader.scss'
import React, { useCallback } from 'react'

import classNames from 'classnames'

import Icon from 'client/components/Icon'

interface Props {
  title: string
  checked: boolean
  isOpen: boolean
  tabIndex: number
  onCheckboxClick: () => void
  onExpandClick: (isOpen: boolean) => void
}

const SatelliteSourceHeader: React.FC<Props> = ({ title, checked, isOpen, tabIndex, onCheckboxClick, onExpandClick }) => {
  const handleExpandClick = useCallback(() => {
    onExpandClick(!isOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <div className="geo-map-menu-mosaic-select-header">
      <div
        className="geo-map-menu-mosaic-select-checkbox"
        role="checkbox"
        aria-checked={checked}
        tabIndex={tabIndex}
        onClick={onCheckboxClick}
        onKeyDown={onCheckboxClick}
      >
        <div className={classNames('fra-checkbox', { checked })} />
        <p>{title}</p>
      </div>
      <div
        className="geo-map-menu-mosaic-icon-expand"
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

export default SatelliteSourceHeader
