import './CustomAssetControl.scss'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Layer, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

const CustomAssetControl: React.FC<Props> = (props) => {
  const { layer, sectionKey } = props
  const { key: layerKey } = layer

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
    <DataGrid className="geo-custom-assest-control" gridTemplateColumns="200px auto">
      <DataCell
        editable
        error={
          inputError ||
          layerState?.status === LayerFetchStatus.Failed ||
          (layerState?.options?.assetId ?? '').length === 0
        }
        lastCol
        lastRow
      >
        <InputText ref={inputRef} onChange={handleInputChange} placeholder={t('geo.geeAssetId')} value={inputValue} />
      </DataCell>
      <Button label={t('common.load')} onClick={handleSubmit} size={ButtonSize.s} />
    </DataGrid>
  )
}

export default CustomAssetControl
