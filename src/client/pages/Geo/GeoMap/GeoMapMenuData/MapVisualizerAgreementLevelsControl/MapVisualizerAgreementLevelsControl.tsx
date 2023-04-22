import './MapVisualizerAgreementLevelsControl.scss'
import React, { useState } from 'react'
import { batch } from 'react-redux'

import axios from 'axios'
import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ExtraEstimation, ForestKey } from 'meta/geo'
import { LayerSource } from 'meta/geo/forest'

import { useAppDispatch } from 'client/store'
import { GeoActions, useForestSourceOptions, useGeoStatistics } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import { forestLayers } from '../MapVisualizerPanel'
import LayerOptionsPanel from '../MapVisualizerPanel/LayerOptionsPanel'

const AgreementLevelsControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const forestOptions = useForestSourceOptions()
  const geoStatistics = useGeoStatistics()
  const agreementLayerKey = 'Agreement'

  const [estimateButtonDisabled, setEstimateButtonDisabled] = useState(false)
  const [selectedScaler, setSelectedScaler] = useState('30')
  const [estimationError, setEstimationError] = useState(null)

  const handleScalerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScaler(event.target.value)
  }

  const handleEstimateButtonClick = () => {
    setEstimateButtonDisabled(true)
    setEstimationError(null)

    const layers: Array<LayerSource> = forestOptions.selected.map((key) => {
      const isHansen = key === ForestKey.Hansen
      const isCustomAsset = key === ForestKey.CustomFnF
      const layer: LayerSource = {
        key,
      }
      if (isHansen) {
        layer.options = {
          gteTreeCoverPercent: forestOptions.hansenPercentage,
        }
      } else if (isCustomAsset) {
        layer.options = {
          assetId: forestOptions.customAssetId,
        }
      }

      return layer
    })

    const requestBody = {
      countryIso,
      layers,
      gteAgreementLevel: forestOptions.agreementLevel,
      scale: selectedScaler,
    }

    axios({ method: 'POST', url: ApiEndPoint.Geo.Estimations.forestAgreement(), data: requestBody })
      .then((response) => {
        const label = ExtraEstimation.CustomRecipe
        const area = response.data.areaHa
        const fra1ALandArea = geoStatistics.forestEstimations.data.fra1aLandArea
        const percentage = (area * 100) / (fra1ALandArea * 1000)
        const entry: [string, number, number] = [label, Number(area.toFixed(2)), Number(percentage.toFixed(2))]
        dispatch(GeoActions.insertTabularEstimationEntry([-1, entry]))
      })
      .catch((error) => {
        setEstimationError(error.message)
      })
      .finally(() => {
        setEstimateButtonDisabled(false)
      })
  }

  const toggleAgreementLayer = (selected: boolean) => {
    batch(() => {
      dispatch(GeoActions.setForestLayersRecipe('custom'))
      dispatch(GeoActions.setAgreementLayerSelected(selected))
      dispatch(GeoActions.setAgreementLayerStatus(null))
    })
  }

  const setAgreementLevel = (level: number) => {
    batch(() => {
      dispatch(GeoActions.setAgreementLevel(level))
    })
  }

  return forestOptions.selected.length >= 2 ? (
    <GeoMapMenuListElement
      title="Agreement layer"
      tabIndex={0}
      checked={forestOptions.agreementLayerSelected}
      onCheckboxClick={() => toggleAgreementLayer(!forestOptions.agreementLayerSelected)}
      loadingStatus={forestOptions.agreementLayerStatus}
    >
      <>
        <LayerOptionsPanel layerKey={agreementLayerKey} checked={forestOptions.agreementLayerSelected} />
        {forestOptions.agreementLayerSelected && (
          <div className="geo-map-menu-data-visualizer-agreement-levels-control">
            <p>
              <small>
                Choose the min. agreement level between selected layers. Agreement level <i>N</i> means that at least{' '}
                <i>N</i> of the selected data sources need to agree that a certain pixel is forest area.
              </small>
            </p>
            <div className="geo-map-menu-data-visualizer-agreement-levels-boxes">
              {Array(forestLayers.length)
                .fill(undefined)
                .map((_, i) => {
                  const level = i + 1
                  const id = `agreement-${level}`
                  const disabled = level > forestOptions.selected.length

                  // Agreement layer color legend
                  const agreementLevelOffset = level - forestOptions.agreementLevel
                  const genericStyle =
                    agreementLevelOffset >= 0 &&
                    level <= forestOptions.selected.length &&
                    agreementLevelOffset < forestOptions.agreementPalette.length
                      ? {
                          backgroundColor: `${forestOptions.agreementPalette[agreementLevelOffset]}`,
                        }
                      : {}
                  const selectedStyle =
                    forestOptions.agreementPalette.length > 0
                      ? {
                          backgroundColor: `${forestOptions.agreementPalette[agreementLevelOffset]}`,
                          boxShadow: `0px 0px 3px 3px ${forestOptions.agreementPalette[agreementLevelOffset]}30`,
                        }
                      : {}

                  const style = level === forestOptions.agreementLevel ? selectedStyle : genericStyle

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
        )}
        {forestOptions.agreementLayerSelected && (
          <div className="custom-agreement-area-container">
            <select
              className="custom-agreement-area-scale-selector"
              onChange={(e) => {
                handleScalerChange(e)
              }}
            >
              <option value="30">30m reducer scale</option>
              <option value="100">100m reducer scale</option>
              <option value="200">200m reducer scale</option>
            </select>
            <button
              type="button"
              disabled={estimateButtonDisabled}
              className="btn btn-primary custom-agreement-area-estimate-button"
              onClick={handleEstimateButtonClick}
            >
              Estimate custom agreement area
            </button>
          </div>
        )}
        {forestOptions.agreementLayerSelected && estimationError && (
          <p className="estimation-error-message">
            An error has occured while calculating the estimation: {estimationError}
          </p>
        )}
      </>
    </GeoMapMenuListElement>
  ) : null
}

export default AgreementLevelsControl
