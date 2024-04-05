import './Layer.scss'
import React from 'react'

import { LayerControlType } from 'meta/geo/layer'

import InputRange, { InputRangeSize } from 'client/components/Inputs/InputRange'
import OptionsGrid from 'client/components/Navigation/NavGeo/Grid/OptionsGrid'
import { ControlComponents } from 'client/components/Navigation/NavGeo/Layer/ControlComponents'
import ToggleControl from 'client/components/Navigation/NavGeo/Layer/ToggleControl'
import { LayerProps } from 'client/components/Navigation/NavGeo/Layer/types'
import { useCountSectionSelectedLayers } from 'client/pages/Geo/Map/hooks/useCountSectionSelectedLayers'

import { useLayerMeta } from './hooks/useLayerMeta'
import { useLayerUi } from './hooks/useLayerUi'
import { useOnOpacityChange } from './hooks/useOnOpacityChange'
import { useToggleLayer } from './hooks/useToggleLayer'

const Layer: React.FC<LayerProps> = (props) => {
  const { layer, section } = props
  const { key: sectionKey } = section

  const countLayersSelected = useCountSectionSelectedLayers({ ignoreAgreementLayer: true, sectionKey })
  const layerMeta = useLayerMeta({ layer })
  const layerUi = useLayerUi({ layerMeta, section })
  const onOpacityChange = useOnOpacityChange({ layerMeta, section })
  const toggleLayer = useToggleLayer({ layerMeta, section })

  const { title, type } = layerMeta
  const { backgroundColor, opacity, selected, showControl, status } = layerUi
  const ControlComponent = showControl ? ControlComponents[type] : undefined

  if (type === LayerControlType.Agreement && countLayersSelected < 2 && !selected) return null

  return (
    <>
      <ToggleControl
        backgroundColor={backgroundColor}
        checked={selected}
        label={title}
        onCheckboxClick={toggleLayer}
        status={status}
      />
      <InputRange
        disabled={!selected}
        onChange={onOpacityChange}
        size={InputRangeSize.xs}
        unit="%"
        value={opacity * 100}
      />

      {ControlComponent && (
        <OptionsGrid className="geo-options-grid__one-col layer-controls">
          <ControlComponent layer={layer} sectionKey={sectionKey} />
        </OptionsGrid>
      )}
    </>
  )
}

export default Layer
