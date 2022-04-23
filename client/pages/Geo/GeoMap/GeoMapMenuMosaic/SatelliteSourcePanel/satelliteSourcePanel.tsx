import './satelliteSourcePanel.scss'
import React, { useCallback, useState } from 'react'

const SatelliteSourcePanel: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(30)

  const handleChange = useCallback(
    (event) => {
      setSliderValue(event.target.value as number)
    },
    [sliderValue]
  )

  return (
    <div className="geo-map-menu-mosaic-satellite-panel">
      <div>
        <p>Start Date</p>
        <div>
          <input type="date" value="2022-01-01" />
        </div>
      </div>
      <div>
        <p>End Date</p>
        <div>
          <input type="date" value="2022-03-31" />
        </div>
      </div>
      <div>
        <p>Max Cloud Coverage</p>
        <div>
          <div>{`${sliderValue}%`}</div>
          <input type="range" min="0" max="100" value={sliderValue} onChange={handleChange} />
        </div>
      </div>
      <button type="button" className="btn-s btn-primary geo-map-menu-mosaic-btn-apply">
        Apply
      </button>
    </div>
  )
}

export default SatelliteSourcePanel
