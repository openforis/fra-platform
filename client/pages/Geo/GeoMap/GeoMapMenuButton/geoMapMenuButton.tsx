import './geoMapMenuButton.scss'
import React, { useCallback } from 'react'

import { MapPanel } from '@meta/geo'
import { GeoActions, useSelectedPanel } from '@client/store/ui/geo'
import { useAppDispatch } from '@client/store'

interface Props {
  panel: MapPanel
  text: string
}

const GeoMapMenuButton: React.FC<Props> = ({ panel, text }) => {
  const selectedPanel = useSelectedPanel()
  const dispatch = useAppDispatch()

  const handleClick = useCallback(() => {
    if (selectedPanel === panel) {
      dispatch(GeoActions.updateSelectedPanel(null))
    } else {
      dispatch(GeoActions.updateSelectedPanel(panel))
    }
  }, [selectedPanel, panel])

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className={`geo-map-menu-button geo-map-menu-button-${panel} ${selectedPanel === panel ? ' selected' : ''}`}
    >
      {text}
    </button>
  )
}

export default GeoMapMenuButton
