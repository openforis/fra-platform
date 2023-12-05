import './AgreementLevelControl.scss'
import React from 'react'

import { LayerKey, LayerSection, LayerSectionKey } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus, LayersSectionState } from 'client/store/ui/geo/stateType'
import GeoMapMenuListElement from 'client/pages/Geo/GeoMap/GeoMapMenuListElement'
import { useFetchAgreementLevelLayer } from 'client/pages/Geo/GeoMap/hooks'

import LayerOpacityControl from '../LayerOpacityControl/LayerOpacityControl'
import AgreementLevelSelector from './AgreementLevelSelector/AgreementLevelSelector'

interface Props {
  checked: boolean
  opacity: number
  onOpacityChange: (value: number, layerKey: LayerKey) => void
  onToggle: (layerKey: LayerKey, fetch?: boolean) => void
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  loadingStatus: LayerFetchStatus
  section: LayerSection
  sectionState: LayersSectionState
}
const AgreementLevelControl: React.FC<Props> = ({
  checked,
  opacity,
  onToggle,
  onOpacityChange,
  sectionKey,
  layerKey,
  loadingStatus,
  section,
  sectionState,
}) => {
  const dispatch = useAppDispatch()
  const layerState = useGeoLayer(sectionKey, layerKey)
  useFetchAgreementLevelLayer(sectionKey, layerKey)

  const setAgreementLevel = (level: number) => {
    dispatch(GeoActions.setAgreementLevel({ sectionKey, layerKey, level }))
  }

  let countLayersSelected = 0
  if (sectionState) {
    Object.keys(sectionState).forEach((layerKey) => {
      if (layerKey === 'Agreement') return
      const layerState = sectionState[layerKey as LayerKey]
      if (layerState.selected) countLayersSelected += 1
    })
  }

  if (countLayersSelected < 2) return null

  return (
    <GeoMapMenuListElement
      title="Agreement layer"
      tabIndex={0}
      checked={checked}
      onCheckboxClick={() => onToggle(layerKey, false)}
      loadingStatus={loadingStatus}
    >
      <LayerOpacityControl layerKey={layerKey} checked={checked} onChange={onOpacityChange} opacity={opacity} />
      {checked && (
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
      )}
    </GeoMapMenuListElement>
  )
}

export default AgreementLevelControl
