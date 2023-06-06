import './SatelliteSourcePanel.scss'
import React from 'react'

import { LayerStatus, MosaicOptions, MosaicSource } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useAppliedMosaicOptions, useUiMosaicOptions } from 'client/store/ui/geo'

interface ControlProps {
  label: string
  children: React.ReactNode
}

const Control: React.FC<ControlProps> = ({ label, children }) => {
  return (
    <>
      <p className="geo-map-menu-mosaic-satellite-panel__label">{label}</p>
      <div>{children}</div>
    </>
  )
}

interface Props {
  loadingStatus?: string
}
const SatelliteSourcePanel: React.FC<Props> = ({ loadingStatus }) => {
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

  const applyChanges = () => {
    dispatch(GeoActions.applyMosaicOptions())
  }

  return (
    <div className="geo-map-menu-mosaic-satellite-panel">
      {loadingStatus === LayerStatus.failed && (
        <p className="geo-map-menu-mosaic-satellite-error-message">Error: No mosaic available for the selected configuration.</p>
      )}
      <div>
        <Control label="Sources">
          <>
            {sources.map(({ key, label }) => (
              <div key={key}>
                <input
                  id={key}
                  className="geo-map-menu-mosaic-satellite-panel__checkbox"
                  type="checkbox"
                  checked={uiMosaicOptions.sources.includes(key)}
                  onChange={() => dispatch(GeoActions.toggleMosaicSource(key))}
                />
                <label htmlFor={key}>{label}</label>
              </div>
            ))}
          </>
        </Control>
      </div>
      <div>
        <Control label="Year">
          <select value={uiMosaicOptions.year} onChange={(e) => dispatch(GeoActions.setMosaicYear(Number(e.target.value)))}>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </Control>
      </div>
      <div>
        <Control label="Max Cloud Coverage">
          <>
            <div>{`${uiMosaicOptions.maxCloudCoverage}%`}</div>
            <input
              type="range"
              min="0"
              max="100"
              value={uiMosaicOptions.maxCloudCoverage}
              onChange={(e) => dispatch(GeoActions.setMosaicMaxCloudCoverage(Number(e.target.value)))}
            />
          </>
        </Control>
      </div>
      <button
        type="button"
        className="btn btn-primary geo-map-menu-mosaic-btn-apply"
        disabled={!optionsHaveChanged}
        onClick={() => applyChanges()}
      >
        Apply changes
      </button>
    </div>
  )
}

SatelliteSourcePanel.defaultProps = {
  loadingStatus: null,
}
export default SatelliteSourcePanel
