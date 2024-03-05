import './Layer.scss'
import React from 'react'

import { Layer as LayerType, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import InputRange from 'client/components/Inputs/InputRange'
import LayerToggleControl from 'client/components/Navigation/NavGeo/LayerToggleControl'

import { useLayerControl } from './hooks/useLayerControl'

type Props = {
  layer: LayerType
  sectionKey: LayerSectionKey
}

const Layer: React.FC<Props> = (props) => {
  const { layer, sectionKey } = props
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  const { fetchOnSelect, layerControlType, opacity, selected, status, title } = useLayerControl({
    layer,
    sectionKey,
  })
  const layerKey = layer.key

  const handleOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newOpacity = Math.round(Number(event.currentTarget.value) / 10) / 10
    dispatch(GeoActions.setLayerOpacity({ countryIso, layerKey, opacity: newOpacity, sectionKey }))
  }

  const handleToggleLayer = () => {
    if (fetchOnSelect) {
      dispatch(GeoActions.toggleLayer({ fetchLayerParams: { countryIso }, layerKey, sectionKey }))
    } else {
      dispatch(GeoActions.toggleLayer({ layerKey, sectionKey }))
    }
  }

  return (
    <div className="geo-layer-control__container">
      <LayerToggleControl
        backgroundColor={layer.metadata?.palette?.[0]}
        checked={selected}
        label={title}
        onCheckboxClick={handleToggleLayer}
        status={status}
      />
      <InputRange disabled={!selected} onChange={handleOpacityChange} unit="%" value={opacity * 100} />
      {/* To add: Year and Tree cover percent components */}
      {layerControlType !== null && selected && (
        <div className="geo-layer-control__options-container">{layerControlType}</div>
      )}
      <div className="geo-layer-control__row-border" />
    </div>
  )
}

export default Layer
