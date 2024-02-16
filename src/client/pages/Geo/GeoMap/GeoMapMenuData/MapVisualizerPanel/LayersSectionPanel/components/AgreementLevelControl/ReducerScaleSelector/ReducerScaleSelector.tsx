import './ReducerScaleSelector.scss'
import React, { useState } from 'react'

import { ExtraEstimation } from 'meta/geo'
import { LayerSection } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoExtaEstimation } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'

interface Props {
  section: LayerSection
}
const ReducerScaleSelector: React.FC<Props> = ({ section }) => {
  const extraEstimation = ExtraEstimation.CustomRecipe

  const [selectedScaler, setSelectedScaler] = useState('30')
  const dispatch = useAppDispatch()

  const extraEstimationState = useGeoExtaEstimation(section.key, extraEstimation)
  const { error, isLoading } = extraEstimationState || {}
  const countryIso = useCountryIso()
  const handleScalerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScaler(event.target.value)
  }

  const handleEstimateButtonClick = () => {
    dispatch(
      GeoActions.postExtraEstimation({
        countryIso,
        sectionKey: section.key,
        scale: parseInt(selectedScaler, 10),
        extraEstimation,
      })
    )
  }

  return (
    <>
      <div className="custom-agreement-area-container">
        <select
          className="custom-agreement-area-scale-selector"
          onChange={(e) => {
            handleScalerChange(e)
          }}
        >
          <option value="30">30m reducer scale</option>
          <option value="100">100m reducer scale</option>
          <option value="200">200m reducer scale</option>
        </select>
        <button
          type="button"
          disabled={isLoading || false}
          className="btn btn-primary custom-agreement-area-estimate-button"
          onClick={handleEstimateButtonClick}
        >
          Estimate custom agreement area
        </button>
      </div>
      {error && <p className="estimation-error-message">{error}</p>}
    </>
  )
}

export default ReducerScaleSelector
