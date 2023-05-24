import './YearControl.scss'
import React from 'react'

import { Layer, LayerKey, LayerSectionKey } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions } from '@client/store/ui/geo'
import { LayerState } from '@client/store/ui/geo/stateType'
import { useFetchNewLayerOption } from '@client/pages/Geo/GeoMap/hooks'

interface Props {
  sectionKey: LayerSectionKey
  layerKey: LayerKey
  layer: Layer
  layerState: LayerState
}
const YearControl: React.FC<Props> = ({ sectionKey, layerKey, layerState, layer }) => {
  const dispatch = useAppDispatch()

  useFetchNewLayerOption(sectionKey, layerKey, 'year')

  const handleYearChange = (year: string) => {
    dispatch(GeoActions.setLayerYear({ sectionKey, layerKey, year: Number(year) }))
  }

  return (
    <div className="layer-year-selector-container">
      <p>Year</p>
      <select
        className="layer-year-selector"
        value={layerState?.options?.year ?? ''}
        onChange={(e) => handleYearChange(e.target.value)}
      >
        <option value="" disabled>
          Select a year...
        </option>
        {layer.options.years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

export default YearControl
