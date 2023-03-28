import './MapVisualizerAgreementLevelsControl.scss'
import React from 'react'
import { batch } from 'react-redux'

import classNames from 'classnames'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'

import GeoMapMenuListElement from '../../GeoMapMenuListElement'
import { layers } from '../MapVisualizerPanel'
import LayerOptionsPanel from '../MapVisualizerPanel/LayerOptionsPanel'

const AgreementLevelsControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const agreementLayerKey = 'Agreement'

  const toggleAgreementLayer = (selected: boolean) => {
    batch(() => {
      dispatch(GeoActions.setRecipe('custom'))
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
              {Array(layers.length)
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
      </>
    </GeoMapMenuListElement>
  ) : null
}

export default AgreementLevelsControl
