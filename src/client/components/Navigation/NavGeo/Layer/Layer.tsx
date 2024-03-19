import './Layer.scss'
import React from 'react'

import { Layer as LayerType } from 'meta/geo'
import { LayerControlType, LayerSection } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import InputRange from 'client/components/Inputs/InputRange'
import AgreementLevelControl from 'client/components/Navigation/NavGeo/AgreementLevelControl'
import CustomAssetControl from 'client/components/Navigation/NavGeo/CustomAssetControl'
import LayerToggleControl from 'client/components/Navigation/NavGeo/LayerToggleControl'
import TreeCoverPercentControl from 'client/components/Navigation/NavGeo/TreeCoverPercentControl'
import YearControl from 'client/components/Navigation/NavGeo/YearControl'
import { useCountSectionSelectedLayers } from 'client/pages/Geo/Map/hooks/useCountSectionSelectedLayers'

import { useLayerControl } from './hooks/useLayerControl'

type Props = {
  layer: LayerType
  section: LayerSection
}

const Layer: React.FC<Props> = (props) => {
  const { layer, section } = props
  const layerKey = layer.key
  const sectionKey = section.key

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  const { backgroundColor, fetchOnSelect, layerControlType, opacity, selected, shouldShowControl, status, title } =
    useLayerControl({
      layer,
      sectionKey,
    })

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
        return <TreeCoverPercentControl layer={layer} sectionKey={sectionKey} />
      case LayerControlType.CustomAsset:
        return <CustomAssetControl layerKey={layerKey} sectionKey={sectionKey} />
      case LayerControlType.Agreement:
        return <AgreementLevelControl layer={layer} sectionKey={sectionKey} />
      case LayerControlType.Year:
        return <YearControl layer={layer} sectionKey={sectionKey} />
      default:
        return null
    }
  }

  const countLayersSelected = useCountSectionSelectedLayers({ ignoreAgreementLayer: true, sectionKey })

  if (layerControlType === LayerControlType.Agreement && countLayersSelected < 2 && !selected) return null

  return (
    <div className="geo-layer-control__container">
      <LayerToggleControl
        backgroundColor={backgroundColor}
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
