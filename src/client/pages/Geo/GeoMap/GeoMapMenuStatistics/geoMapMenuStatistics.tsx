import './geoMapMenuStatistics.scss'
import React from 'react'

import { useGeoStatistics, useSelectedPanel } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
import { useGeoStatisticsHandler } from 'client/pages/Geo/GeoMap/hooks'

import GeoMapMenuButton from '../GeoMapMenuButton'
import GeoMenuItem from '../GeoMapMenuItem'
import StatisticalGraphsPanel from './StatisticalGraphsPanel'
import TreeCoverAreaPanel from './TreeCoverAreaPanel'

const GeoMapMenuStatistics: React.FC = () => {
  useGeoStatisticsHandler()
  const year = 2020 // Default value is 2020 for now
  const countryIso = useCountryIso()
  const selectedPanel = useSelectedPanel()
  const { tabularEstimationData: statisticsData, isLoading, error } = useGeoStatistics()

  return (
    <div className="geo-map-menu-item statistics">
      <GeoMapMenuButton panel="statistics" text="Statistics" icon="histogram" />
      {selectedPanel === 'statistics' && (
        <div>
          <GeoMenuItem title="Tree Cover Area" checked={null} tabIndex={-1}>
            {!isLoading && statisticsData.length > 0 && <TreeCoverAreaPanel data={statisticsData} countryIso={countryIso} year={year} />}
            {!isLoading && statisticsData.length === 0 && !error && <p>Found no data.</p>}
            {!isLoading && error && <p className="geo-map-alt-message">An error has occured while fetching the statistics: {error}</p>}
            {isLoading && <p className="geo-map-alt-message">Loading...</p>}
          </GeoMenuItem>
          <div className="geo-map-menu-separator" />
          <GeoMenuItem title="Statistical Graphs" checked={null} tabIndex={-3}>
            {!isLoading && statisticsData.length > 0 && (
              <StatisticalGraphsPanel data={statisticsData} countryIso={countryIso} year={year} />
            )}
            {!isLoading && statisticsData.length === 0 && !error && <p>Found no data.</p>}
            {!isLoading && error && <p className="geo-map-alt-message">An error has occured while fetching the statistics: {error}</p>}
            {isLoading && <p className="geo-map-alt-message">Loading...</p>}
          </GeoMenuItem>
        </div>
      )}
    </div>
  )
}

export default GeoMapMenuStatistics
