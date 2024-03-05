import './Layer.scss'
import React from 'react'

import { Layer as LayerType, LayerSectionKey } from 'meta/geo'
import { LayerControlType } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import InputRange from 'client/components/Inputs/InputRange'
import CustomAssetControl from 'client/components/Navigation/NavGeo/CustomAssetControl'
import LayerToggleControl from 'client/components/Navigation/NavGeo/LayerToggleControl'
import TreeCoverPercentControl from 'client/components/Navigation/NavGeo/TreeCoverPercentControl'

import { useLayerControl } from './hooks/useLayerControl'

type Props = {
  layer: LayerType
  sectionKey: LayerSectionKey
}

const Layer: React.FC<Props> = (props) => {
  const { layer, sectionKey } = props
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  const { fetchOnSelect, layerControlType, opacity, selected, shouldShowControl, status, title } = useLayerControl({
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

  const renderControlComponent = (): React.ReactElement => {
    switch (layerControlType) {
      case LayerControlType.TreeCoverPercent:
        return <TreeCoverPercentControl sectionKey={sectionKey} layerKey={layer.key} layer={layer} />
      case LayerControlType.CustomAsset:
        return <CustomAssetControl sectionKey={sectionKey} layerKey={layer.key} />
      // To add: Year and Agreement components
      default:
        return null
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
      {shouldShowControl && <div className="geo-layer-control__options-container">{renderControlComponent()}</div>}
      <div className="geo-layer-control__row-border" />
    </div>
  )
}

export default Layer
