import './geoMapMenuStatistics.scss'
import React from 'react'

import { useSelectedPanel } from '@client/store/ui/geo'
import { useEstimationsData } from '@client/pages/Geo/GeoMap/hooks'

import GeoMapMenuButton from '../GeoMapMenuButton'
import GeoMenuItem from '../GeoMapMenuItem'
import StatisticalGraphsPanel from './StatisticalGraphsPanel'
import TreeCoverAreaPanel from './TreeCoverAreaPanel'

const GeoMapMenuStatistics: React.FC = () => {
  const selectedPanel = useSelectedPanel()
  const { tabularEstimationData: statisticsData, isLoading, error, countryIso, year } = useEstimationsData()

  return (
    <div className="geo-map-menu-item statistics">
      <GeoMapMenuButton panel="statistics" text="Statistics" icon="histogram" />
      {selectedPanel === 'statistics' && (
        <div>
          <GeoMenuItem title="Tree Cover Area" checked={null} tabIndex={-1}>
            {!isLoading && statisticsData.length > 0 && (
              <TreeCoverAreaPanel data={statisticsData} countryIso={countryIso} year={year} />
            )}
            {!isLoading && statisticsData.length === 0 && !error && <p>Found no data.</p>}
            {!isLoading && error && (
              <p className="geo-map-alt-message">An error has occured while fetching the statistics: {error}</p>
            )}
            {isLoading && <p className="geo-map-alt-message">Loading...</p>}
          </GeoMenuItem>
          <div className="geo-map-menu-separator" />
          <GeoMenuItem title="Statistical Graphs" checked={null} tabIndex={-3}>
            {!isLoading && statisticsData.length > 0 && (
              <StatisticalGraphsPanel data={statisticsData} countryIso={countryIso} year={year} />
            )}
            {!isLoading && statisticsData.length === 0 && !error && <p>Found no data.</p>}
            {!isLoading && error && (
              <p className="geo-map-alt-message">An error has occured while fetching the statistics: {error}</p>
            )}
            {isLoading && <p className="geo-map-alt-message">Loading...</p>}
          </GeoMenuItem>
        </div>
      )}
    </div>
  )
}

export default GeoMapMenuStatistics
