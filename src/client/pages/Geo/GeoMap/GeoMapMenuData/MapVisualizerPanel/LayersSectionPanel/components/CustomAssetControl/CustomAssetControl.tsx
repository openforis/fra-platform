import './CustomAssetControl.scss'
import React, { ChangeEvent, useState } from 'react'

import classNames from 'classnames'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'

import LayerOpacityControl from '../LayerOpacityControl'

interface Props {
  checked: boolean
  opacity: number
  onOpacityChange: (value: number, layerKey: LayerKey) => void
  onToggle: (layerKey: LayerKey) => void
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  backgroundColor?: string
  loadingStatus: LayerFetchStatus
}
const CustomAssetControl: React.FC<Props> = ({
  checked,
  opacity,
  onToggle,
  onOpacityChange,
  sectionKey,
  layerKey,
  backgroundColor,
  loadingStatus,
}) => {
  const dispatch = useAppDispatch()
  const layerState = useGeoLayer(sectionKey, layerKey)
  const countryIso = useCountryIso()

  const [inputValue, setInputValue] = useState(layerState?.options?.assetId ?? '')
  const [inputError, setInputError] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    if (inputError && event.target.value.trim() !== '') {
      setInputError(false)
    }
  }

  const handleSubmit = (): void => {
    if (inputValue.trim() === '') {
      setInputError(true)
    } else {
      setInputError(false)
      dispatch(GeoActions.setAssetId({ sectionKey, layerKey, assetId: inputValue.trim() }))
      dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
    }
  }

  const handleToggle = (layerKey: LayerKey): void => {
    if (!checked && (layerState?.options?.assetId ?? '') === '') {
      setInputError(true)
    } else {
      onToggle(layerKey)
    }
  }

  return (
    <>
      <div className="custom-asset-list-element">
        <div className="custom-asset-item-title">
          <div
            className="custom-asset-list-element-checkbox"
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            onClick={() => handleToggle(layerKey)}
            onKeyDown={() => handleToggle(layerKey)}
          >
            <div
              style={checked && loadingStatus !== LayerFetchStatus.Loading ? { backgroundColor } : {}}
              className={classNames({
                'fra-checkbox': loadingStatus !== LayerFetchStatus.Loading,
                checked,
                'loading-spinner': loadingStatus === LayerFetchStatus.Loading,
                failed: loadingStatus === LayerFetchStatus.Failed,
              })}
            />
          </div>
          <div className="custom-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="GEE asset id"
              className={classNames('custom-input', { error: inputError })}
            />
            <button type="button" className="btn-primary" onClick={handleSubmit}>
              Load
            </button>
          </div>
        </div>
        <LayerOpacityControl layerKey={layerKey} checked={checked} onChange={onOpacityChange} opacity={opacity} />
      </div>
      <div className="custom-asset-list-element-bottom" />
    </>
  )
}

CustomAssetControl.defaultProps = {
  backgroundColor: null,
}

export default CustomAssetControl
