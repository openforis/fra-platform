import './MapVisualizerAgreementLevelsControl.scss'
import React, { useEffect, useRef, useState } from 'react'
import { batch } from 'react-redux'

import axios from 'axios'
import classNames from 'classnames'

import { ForestSource, Layer } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import { layers } from '../MapVisualizerPanel'
import LayerOptionsPanel from '../MapVisualizerPanel/LayerOptionsPanel'

const AgreementLevelsControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const map = useGeoMap()
  const forestOptions = useForestSourceOptions()
  const mapControllerRef = useRef<MapController>(new MapController(map))
  const agreementLayerCache = useRef<{ [key: string]: Layer }>({})
  const [currentPalette, setCurrentPalette] = useState<string[]>([])
  const agreementLayerKey = 'Agreement'

  /**
   * Toggle agreement layer
   */
  useEffect(() => {
    // If any of the dependencies changes and there is an existing agreement layer on the
    // map, the layer is no longer valid, so remove it. If there is no existing agreement
    // layer, it's still safe to call `removeEarthEngineLayer`, it'll just do nothing and
    // return `false`.
    mapControllerRef.current.removeEarthEngineLayer(agreementLayerKey)
    setCurrentPalette([])

    // If less than two sources are selected or the agreement level is greater than the
    // number of selected layers, reset the agreement state.
    if (forestOptions.selected.length < 2 || forestOptions.agreementLevel > forestOptions.selected.length) {
      dispatch(GeoActions.resetAgreementLayer())
      return
    }

    // If the agreement layer is not selected, don't render anything.
    if (!forestOptions.agreementLayerSelected) {
      return
    }

    // Otherwise, fetch the new agreement layer and add it to the map.

    const layerQuery = forestOptions.selected.map((key) => `&layer=${key}`).join('')
    const agreementLevelQuery = `&gteAgreementLevel=${forestOptions.agreementLevel}`
    const hansenQuery = forestOptions.selected.includes(ForestSource.Hansen)
      ? `&gteHansenTreeCoverPerc=${forestOptions.hansenPercentage}`
      : ''
    const uri = `/api/geo/layers/forestAgreement/?countryIso=FIN${layerQuery}${agreementLevelQuery}${hansenQuery}`

    // Use cached mapId if available
    if (agreementLayerCache.current[uri]) {
      const { mapId, palette } = agreementLayerCache.current[uri]
      mapControllerRef.current.addEarthEngineLayer(agreementLayerKey, mapId)
      setCurrentPalette(palette)
      return
    }

    // Otherwise, fetch a new map id from server and cache it for later use
    axios.get<Layer>(uri).then((response) => {
      const { mapId, palette } = response.data

      // Cache mapId for later use
      agreementLayerCache.current[uri] = { mapId, palette }

      // Render layer
      mapControllerRef.current.addEarthEngineLayer(agreementLayerKey, mapId)
      setCurrentPalette(palette)
    })
  }, [
    forestOptions.agreementLayerSelected,
    forestOptions.agreementLevel,
    forestOptions.selected,
    forestOptions.hansenPercentage,
    dispatch,
  ])

  const toggleAgreementLayer = (selected: boolean) => {
    batch(() => {
      dispatch(GeoActions.setRecipe('custom'))
      dispatch(GeoActions.setAgreementLayerSelected(selected))
    })
  }

  const setAgreementLevel = (level: number) => {
    batch(() => {
      dispatch(GeoActions.setRecipe('custom'))
      dispatch(GeoActions.setAgreementLevel(level))
    })
  }

  return forestOptions.selected.length >= 2 ? (
    <GeoMapMenuListElement
      title="Agreement layer"
      tabIndex={layers.length * -1 - 1}
      checked={forestOptions.agreementLayerSelected}
      onCheckboxClick={() => toggleAgreementLayer(!forestOptions.agreementLayerSelected)}
    >
      <>
        {forestOptions.agreementLayerSelected && <LayerOptionsPanel layerKey={agreementLayerKey} />}
        <div className="geo-map-menu-data-visualizer-agreement-levels-control">
          <p>
            <small>
              Choose the agreement level between all map layers. Agreement level <i>N</i> means that at least <i>N</i>{' '}
              of the selected data sources need to agree that a certain pixel is forest area.
            </small>
          </p>
          <div className="geo-map-menu-data-visualizer-agreement-levels-boxes">
            {Array(layers.length)
              .fill(undefined)
              .map((_, i) => {
                const level = i + 1
                const id = `agreement-${level}`
                const disabled = level > forestOptions.selected.length

                // Agreement layer color legend
                const agreementLevelOffset = level - forestOptions.agreementLevel
                const style =
                  agreementLevelOffset >= 0 &&
                  level <= forestOptions.selected.length &&
                  agreementLevelOffset < currentPalette.length
                    ? {
                        borderBottom: `10px solid ${currentPalette[agreementLevelOffset]}`,
                      }
                    : {}

                return (
                  <span
                    className={classNames('geo-map-menu-data-visualizer-agreement-level', { disabled })}
                    key={level}
                  >
                    <input
                      id={id}
                      className="geo-map-menu-data-visualizer-agreement-levels-box"
                      type="checkbox"
                      checked={level <= forestOptions.agreementLevel}
                      disabled={disabled}
                      onChange={() => setAgreementLevel(level)}
                      style={style}
                    />
                    <label htmlFor={id}>{level}</label>
                  </span>
                )
              })}
          </div>
        </div>
      </>
    </GeoMapMenuListElement>
  ) : null
}

export default AgreementLevelsControl
