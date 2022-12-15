import './MapVisualizerAgreementLevelsControl.scss'
import React, { useEffect, useRef } from 'react'

import axios from 'axios'
import classNames from 'classnames'

import { ForestSource, Layer } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import { layers } from '../MapVisualizerPanel'

const AgreementLevelsControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const map = useGeoMap()
  const forestOptions = useForestSourceOptions()
  const mapControllerRef = useRef<MapController>(new MapController(map))

  /**
   * Toggle agreement layer
   */
  useEffect(() => {
    const agreementLayerKey = 'Agreement'

    // If any of the dependencies changes and there is an existing agreement layer on the
    // map, the layer is no longer valid, so remove it. If there is no existing agreement
    // layer, it's still safe to call `removeEarthEngineLayer`, it'll just do nothing and
    // return `false`.
    mapControllerRef.current.removeEarthEngineLayer(agreementLayerKey)

    // If the agreement level is greater than the number of selected layers, reset the
    // agreement state.
    if (forestOptions.agreementLevel > forestOptions.selected.length) {
      dispatch(GeoActions.setAgreementLayerSelected(false))
      dispatch(GeoActions.setAgreementLevel(1))
      return
    }

    // If the agreement layer is not selected, don't render anything.
    if (!forestOptions.agreementLayerSelected) {
      return
    }

    // Otherwise, fetch the new agreement layer and add it to the map.

    const layerQuery = forestOptions.selected.map(({ key }) => `&layer=${key}`).join('')
    const agreementLevelQuery = `&gteAgreementLevel=${forestOptions.agreementLevel}`
    const hansenQuery = forestOptions.selected.some(({ key }) => key === ForestSource.Hansen)
      ? `&gteHansenTreeCoverPerc=${forestOptions.hansenPercentage}`
      : ''
    const uri = `/api/geo/layers/forestAgreement/?countryIso=FIN${layerQuery}${agreementLevelQuery}${hansenQuery}`

    // TODO: cache the mapId to reduce server calls?
    axios.get<Layer>(uri).then((response) => {
      const { mapId } = response.data
      mapControllerRef.current.addEarthEngineLayer(agreementLayerKey, mapId)
    })
  }, [
    forestOptions.agreementLayerSelected,
    forestOptions.agreementLevel,
    forestOptions.selected,
    forestOptions.hansenPercentage,
    dispatch,
  ])

  return forestOptions.selected.length >= 2 ? (
    <GeoMapMenuListElement
      title="Agreement layer"
      tabIndex={layers.length * -1 - 1}
      checked={forestOptions.agreementLayerSelected}
      onCheckboxClick={() => dispatch(GeoActions.setAgreementLayerSelected(!forestOptions.agreementLayerSelected))}
    >
      <div className="geo-map-menu-data-visualizer-agreement-levels-control">
        <p>
          <small>
            Choose the agreement level between all map layers. Agreement level <i>N</i> means that at least <i>N</i> of
            the selected data sources need to agree that a certain pixel is forest area.
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
                    onChange={() => dispatch(GeoActions.setAgreementLevel(level))}
                  />
                  <label htmlFor={id}>{level}</label>
                </span>
              )
            })}
        </div>
      </div>
    </GeoMapMenuListElement>
  ) : null
}

export default AgreementLevelsControl
