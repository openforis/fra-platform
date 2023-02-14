import './satelliteSourcePanel.scss'
import React from 'react'

import { MosaicOptions, MosaicSource } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useAppliedMosaicOptions, useUiMosaicOptions } from '@client/store/ui/geo'

const SatelliteSourcePanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const uiMosaicOptions = useUiMosaicOptions()
  const appliedMosaicOptions = useAppliedMosaicOptions()
  const startYear = 2000
  const endYear = 2022
  const years = Array(endYear - startYear + 1)
    .fill(startYear)
    .map((_, i) => startYear + i)
  const sources: { key: MosaicSource; label: string }[] = [
    { key: 'sentinel', label: 'Sentinel' },
    { key: 'landsat', label: 'Landsat' },
  ]

  const optionsHaveChanged = Object.entries(uiMosaicOptions).some(
    ([key, uiValue]: [keyof MosaicOptions, MosaicOptions[keyof MosaicOptions]]) => {
      const appliedValue = appliedMosaicOptions[key]
      if (Array.isArray(uiValue) && Array.isArray(appliedValue)) {
        return appliedValue.length !== uiValue.length || appliedValue.some((val) => !uiValue.includes(val))
      }
      return appliedMosaicOptions[key] !== uiValue
    }
  )

  return (
    <div className="geo-map-menu-mosaic-satellite-panel">
      <div>
        <p>Sources</p>
        <div>
          {sources.map(({ key, label }) => (
            <div key={key}>
              <input
                id={key}
                type="checkbox"
                checked={uiMosaicOptions.sources.includes(key)}
                onChange={() => dispatch(GeoActions.toggleMosaicSource(key))}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          ))}
        </div>
        <p>Year</p>
        <div>
          <select
            value={uiMosaicOptions.year}
            onChange={(e) => dispatch(GeoActions.setMosaicYear(Number(e.target.value)))}
          >
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <p>Max Cloud Coverage</p>
        <div>
          <div>{`${uiMosaicOptions.maxCloudCoverage}%`}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={uiMosaicOptions.maxCloudCoverage}
            onChange={(e) => dispatch(GeoActions.setMosaicMaxCloudCoverage(Number(e.target.value)))}
          />
        </div>
      </div>
      <button type="button" className="btn btn-primary geo-map-menu-mosaic-btn-apply" disabled={!optionsHaveChanged}>
        Apply changes
      </button>
    </div>
  )
}

export default SatelliteSourcePanel
