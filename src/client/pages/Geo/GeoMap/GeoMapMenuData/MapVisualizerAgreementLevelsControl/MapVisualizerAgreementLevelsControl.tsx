import './MapVisualizerAgreementLevelsControl.scss'
import React, { useCallback, useRef } from 'react'

import axios from 'axios'

import { ForestSource, Layer } from '@meta/geo'

import { useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'
import Icon from '@client/components/Icon'
import { MapController } from '@client/utils'

const boxes = [
  { title: '1', disabled: false, checked: true },
  { title: '2', disabled: false, checked: true },
  { title: '3', disabled: false, checked: true },
  { title: '4', disabled: false, checked: false },
  { title: '5', disabled: true, checked: false },
  { title: '6', disabled: true, checked: false },
  { title: '7', disabled: true, checked: false },
  { title: '8', disabled: true, checked: false },
]

const AgreementLevelsControl: React.FC = () => {
  const map = useGeoMap()
  const forestOptions = useForestSourceOptions()
  const mapControllerRef = useRef<MapController>(new MapController(map))

  /**
   * Handle agreement level selection
   * @param {number} level The agreement level
   */
  const handleAgreementLevelSelection = useCallback(
    async (level: number): Promise<void> => {
      const layerQuery = forestOptions.selected.map(({ key }) => `&layer=${key}`).join('')
      const hansenQuery = forestOptions.selected.some(({ key }) => key === ForestSource.Hansen)
        ? `&gteHansenTreeCoverPerc=${forestOptions.hansenPercentage}`
        : ''
      const uri = `/api/geo/layers/forestAgreement/?countryIso=FIN${layerQuery}&gteAgreementLevel=${level}${hansenQuery}`

      await axios.get<Layer>(uri).then((response) => {
        const { mapId } = response.data
        const agreementLayerKey = 'Agreement'
        mapControllerRef.current.removeEarthEngineLayer(agreementLayerKey)
        mapControllerRef.current.addEarthEngineLayer(agreementLayerKey, mapId)
      })
    },
    [forestOptions.selected, forestOptions.hansenPercentage]
  )

  return (
    <div className="geo-map-menu-data-visualizer-agreement-levels-control">
      <p>
        <strong>Choose the agreement level between all map layers</strong>
        <br />
        <br />
        <small>
          Agreement level &rdquo;N&rdquo; means that at least N of selected data sources need to agree that a certain
          pixel is forest area
        </small>
      </p>
      <div className="geo-map-menu-data-visualizer-agreement-levels-boxes">
        {boxes.map((box, i) => (
          <button
            type="button"
            key={box.title}
            className={
              box.disabled
                ? 'geo-map-menu-data-visualizer-agreement-levels-box disabled'
                : 'geo-map-menu-data-visualizer-agreement-levels-box'
            }
            aria-disabled={box.disabled}
            onClick={() => handleAgreementLevelSelection(i + 1)}
          >
            {box.disabled ? <Icon name="alert" /> : <Icon name={box.checked ? 'remove' : 'circle-add'} />}
            <br />
            <p>{box.title}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AgreementLevelsControl
