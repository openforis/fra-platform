import './CustomAssetControl.scss'
import React, { ChangeEvent, useState } from 'react'

import classNames from 'classnames'

import { LayerKey, LayerSectionKey } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useGeoLayer } from '@client/store/ui/geo'
import { LayerFetchStatus } from '@client/store/ui/geo/stateType'
import { useCountryIso } from '@client/hooks'

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
  const [validInput, setValidInput] = useState(true)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newAssetId = event.target.value.trim()
    dispatch(GeoActions.setAssetId({ sectionKey, layerKey, assetId: newAssetId }))
    if (newAssetId !== '') {
      setValidInput(true)
    } else {
      setValidInput(false)
    }
  }
  const handleSubmit = (): void => {
    if ((layerState?.options?.assetId ?? '') === '') {
      setValidInput(false)
    } else {
      setValidInput(true)
      dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
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
            onClick={() => onToggle(layerKey)}
            onKeyDown={() => onToggle(layerKey)}
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
              value={layerState?.options?.assetId ?? ''}
              onChange={handleInputChange}
              placeholder="Asset ID"
              className={classNames('custom-input', { error: !validInput })}
            />
            <button type="button" className="btn-primary" onClick={handleSubmit}>
              Submit
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
