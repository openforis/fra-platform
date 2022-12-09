import './MapVisualizerAgreementLevelsControl.scss'
import React, { useCallback, useRef } from 'react'

import axios from 'axios'
import classNames from 'classnames'

import { ForestSource, Layer } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import { layers } from '../MapVisualizerPanel'

const AgreementLevelsControl: React.FC = () => {
  const dispatch = useAppDispatch()
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

      dispatch(GeoActions.setAgreementLevel(level))
    },
    [forestOptions.selected, forestOptions.hansenPercentage, dispatch]
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
        {Array(layers.length)
          .fill(undefined)
          .map((_, i) => {
            const level = i + 1
            const id = `agreement-${level}`
            const disabled = level > forestOptions.selected.length
            return (
              <span className={classNames('geo-map-menu-data-visualizer-agreement-level', { disabled })} key={level}>
                <input
                  id={id}
                  className="geo-map-menu-data-visualizer-agreement-levels-box"
                  type="checkbox"
                  checked={level <= forestOptions.agreementLevel}
                  disabled={disabled}
                  onChange={() => handleAgreementLevelSelection(level)}
                />
                <label htmlFor={id}>{level}</label>
              </span>
            )
          })}
      </div>
    </div>
  )
}

export default AgreementLevelsControl
