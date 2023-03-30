import './CustomAssetControl.scss'
import React, { ChangeEvent, useState } from 'react'

import classNames from 'classnames'

import { ForestSource } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'

import { LayerStatus } from '../..'
import LayerOptionsPanel from '../../LayerOptionsPanel'

const CustomAssetControl: React.FC = () => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()

  const [inputValue, setInputValue] = useState<string>('')
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
      dispatch(GeoActions.setCustomAssetId(inputValue.trim()))
      dispatch(GeoActions.resetSingleLayerStates(ForestSource.CustomFnF))
    }
  }

  const toggleCustomLayer = () => {
    dispatch(GeoActions.toggleForestLayer(ForestSource.CustomFnF))
  }

  const isLayerChecked = forestOptions.selected.includes(ForestSource.CustomFnF)

  let loadingStatus = null
  if (forestOptions.pendingLayers[ForestSource.CustomFnF] !== undefined) loadingStatus = LayerStatus.loading
  if (forestOptions.fetchedLayers[ForestSource.CustomFnF] !== undefined) loadingStatus = LayerStatus.ready
  if (forestOptions.failedLayers[ForestSource.CustomFnF] !== undefined) loadingStatus = LayerStatus.failed

  let checkBoxContent = null
  if (loadingStatus === LayerStatus.loading) {
    checkBoxContent = <div className="loading-spinner" />
  } else if (loadingStatus === LayerStatus.failed) {
    checkBoxContent = <div className={classNames('fra-checkbox', 'failed')} />
  } else {
    checkBoxContent = <div className={classNames('fra-checkbox', { checked: isLayerChecked })} />
  }

  return (
    <>
      <div className="custom-asset-list-element">
        <div className="custom-asset-item-title">
          <div
            className="custom-asset-list-element-checkbox"
            role="checkbox"
            aria-checked={isLayerChecked}
            tabIndex={0}
            onClick={() => toggleCustomLayer()}
            onKeyDown={() => toggleCustomLayer()}
          >
            {checkBoxContent}
          </div>
          <div className="custom-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Asset ID"
              style={{ border: inputError ? '1px solid red' : 'none' }}
            />
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <LayerOptionsPanel layerKey={ForestSource.CustomFnF} checked={isLayerChecked} />
      </div>
      <div className="custom-asset-list-element-bottom" />
    </>
  )
}

export default CustomAssetControl
