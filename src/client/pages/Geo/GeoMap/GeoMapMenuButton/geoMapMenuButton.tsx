import './geoMapMenuButton.scss'
import React, { useCallback } from 'react'

import classNames from 'classnames'

import { MapPanel } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useSelectedPanel } from 'client/store/ui/geo'
import GeoIcon from 'client/components/GeoIcon'

interface Props {
  panel: MapPanel
  text: string
  icon: string
}

const GeoMapMenuButton: React.FC<Props> = ({ panel, text, icon }) => {
  const selectedPanel = useSelectedPanel()
  const dispatch = useAppDispatch()

  const handleClick = useCallback(() => {
    if (selectedPanel === panel) {
      dispatch(GeoActions.updateSelectedPanel(null))
    } else {
      dispatch(GeoActions.updateSelectedPanel(panel))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPanel, panel])

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className={classNames('geo-map-menu-button', `geo-map-menu-button-${panel}`, {
        selected: selectedPanel === panel,
      })}
    >
      <GeoIcon name={icon} className="geo-map-menu-button-icon" />
      {text}
    </button>
  )
}

export default GeoMapMenuButton
