import './CustomAssetControl.scss'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import InputText from 'client/components/Inputs/InputText'

type Props = {
  layerKey: LayerKey
  sectionKey: LayerSectionKey
}

const CustomAssetControl: React.FC<Props> = (props) => {
  const { layerKey, sectionKey } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const countryIso = useCountryIso()

  const layerState = useGeoLayer(sectionKey, layerKey)

  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(layerState?.options?.assetId ?? '')
  const [inputError, setInputError] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    if (event.target.value.trim() !== '') {
      setInputError(false)
    }
  }

  const handleSubmit = (): void => {
    const assetId = inputValue.trim()
    if (assetId === '') {
      setInputError(true)
      inputRef.current?.focus()
    } else {
      setInputError(false)
      dispatch(GeoActions.setAssetId({ sectionKey, layerKey, assetId }))
      dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
    }
  }

  return (
    <div
      className={classNames('geo-custom-assest-control__container', {
        error:
          inputError ||
          layerState?.status === LayerFetchStatus.Failed ||
          (layerState?.options?.assetId ?? '').length === 0,
      })}
    >
      <InputText onChange={handleInputChange} placeholder={t('geo.geeAssetId')} ref={inputRef} value={inputValue} />
      <Button size={ButtonSize.s} onClick={handleSubmit} label={t('common.load')} />
    </div>
  )
}

export default CustomAssetControl
