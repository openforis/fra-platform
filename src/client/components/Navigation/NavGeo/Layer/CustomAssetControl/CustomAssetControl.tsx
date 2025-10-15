import './CustomAssetControl.scss'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Layer, LayerSectionKey } from 'meta/geo'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useGeoLayer } from 'client/store/geo/layers/hooks/layers'
import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'
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
  const layerState = useGeoLayer(layerKey)

  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(layerState?.options?.assetId ?? '')
  const [inputError, setInputError] = useState(false)

  const handleInputChange = useCallback<(event: ChangeEvent<HTMLInputElement>) => void>(
    (event) => {
      setInputValue(event.target.value)
      if (event.target.value.trim() !== '') {
        setInputError(false)
      }
    },
    [setInputError, setInputValue]
  )

  const handleSubmit = useCallback<() => void>(() => {
    const assetId = inputValue.trim()
    if (assetId === '') {
      setInputError(true)
      inputRef.current?.focus()
    } else {
      setInputError(false)
      dispatch(LayersActions.setOptionsProperty({ layerKey, key: 'assetId', value: assetId }))
      dispatch(LayersActions.getLayerMapId({ countryIso, layerKey, sectionKey }))
    }
  }, [countryIso, dispatch, inputValue, layerKey, sectionKey])

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
