import './AgreementLevelControl.scss'
import React from 'react'

import { LayerKey, LayerSection, LayerSectionKey } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import ReducerScaleSelector from 'client/pages/Geo/GeoMap/GeoMapMenuData/MapVisualizerPanel/LayersSectionPanel/components/AgreementLevelControl/ReducerScaleSelector/ReducerScaleSelector'
import LayerOpacityControl from 'client/pages/Geo/GeoMap/GeoMapMenuData/MapVisualizerPanel/LayersSectionPanel/components/LayerOpacityControl'
import GeoMapMenuListElement from 'client/pages/Geo/GeoMap/GeoMapMenuListElement'
import { useFetchAgreementLevelLayer } from 'client/pages/Geo/GeoMap/hooks'
import { useCountSectionSelectedLayers } from 'client/pages/Geo/GeoMap/hooks/useCountSectionSelectedLayers'

import AgreementLevelSelector from './AgreementLevelSelector/AgreementLevelSelector'

interface Props {
  checked: boolean
  layerKey: LayerKey
  loadingStatus: LayerFetchStatus
  onOpacityChange: (value: number, layerKey: LayerKey) => void
  onToggle: (layerKey: LayerKey, fetch?: boolean) => void
  opacity: number
  section: LayerSection
  sectionKey: LayerSectionKey
  title: string
}
const AgreementLevelControl: React.FC<Props> = ({
  checked,
  layerKey,
  loadingStatus,
  onOpacityChange,
  onToggle,
  opacity,
  section,
  sectionKey,
  title,
}) => {
  const dispatch = useAppDispatch()
  const layerState = useGeoLayer(sectionKey, layerKey)
  useFetchAgreementLevelLayer(sectionKey, layerKey)

  const setAgreementLevel = (level: number) => {
    dispatch(GeoActions.setAgreementLevel({ sectionKey, layerKey, level }))
  }

  const countLayersSelected = useCountSectionSelectedLayers({ ignoreAgreementLayer: true, sectionKey })

  if (countLayersSelected < 2) return null

  return (
    <GeoMapMenuListElement
      title={title}
      tabIndex={0}
      checked={checked}
      onCheckboxClick={() => onToggle(layerKey, false)}
      loadingStatus={loadingStatus}
    >
      <LayerOpacityControl layerKey={layerKey} checked={checked} onChange={onOpacityChange} opacity={opacity} />
      {checked && (
        <>
          <div className="geo-map-menu-data-visualizer-agreement-level-control">
            <p>
              <small>
                Choose the min. agreement level between selected layers. Agreement level <i>N</i> means that at least{' '}
                <i>N</i> of the selected data sources need to agree that a certain pixel is forest area.
              </small>
            </p>
            <AgreementLevelSelector
              countLayersSelected={countLayersSelected}
              layerState={layerState}
              section={section}
              layerKey={layerKey}
              onChange={setAgreementLevel}
            />
          </div>
          <ReducerScaleSelector section={section} />
        </>
      )}
    </GeoMapMenuListElement>
  )
}

export default AgreementLevelControl
