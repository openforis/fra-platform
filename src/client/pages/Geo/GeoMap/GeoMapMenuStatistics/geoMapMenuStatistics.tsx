import './geoMapMenuStatistics.scss'
import React from 'react'

import { useGeoStatistics, useSelectedPanel } from 'client/store/ui/geo'
import { useGeoBurnedAreaMODIS, useGeoProtectedAreas } from 'client/store/ui/geo/hooks'
import { useCountryIso } from 'client/hooks'
import BurnedAreaPanel from 'client/pages/Geo/GeoMap/GeoMapMenuStatistics/BurnedAreaPanel'
import ProtectedAreaPanel from 'client/pages/Geo/GeoMap/GeoMapMenuStatistics/ProtectedAreaPanel'
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
  const geoProtectedAreas = useGeoProtectedAreas()
  const geoBurnedAreaMODIS = useGeoBurnedAreaMODIS()

  return (
    <div className="geo-map-menu-item statistics">
      <GeoMapMenuButton panel="statistics" text="Statistics" icon="histogram" />
      {selectedPanel === 'statistics' && (
        <div>
          {/* Tree Cover Area */}
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

          {/*  Statistical Graphs */}
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

          <div className="geo-map-menu-separator" />

          {/* Protected Area */}
          <GeoMenuItem title="Protected Area" checked={null} tabIndex={-5}>
            {!isLoading && geoProtectedAreas && (
              <ProtectedAreaPanel geoProtectedAreas={geoProtectedAreas} countryIso={countryIso} year={year} />
            )}
            {!isLoading && !geoProtectedAreas && !error && <p>Found no data.</p>}
            {!isLoading && error && (
              <p className="geo-map-alt-message">An error has occured while fetching the statistics: {error}</p>
            )}
            {isLoading && <p className="geo-map-alt-message">Loading...</p>}
          </GeoMenuItem>

          <div className="geo-map-menu-separator" />

          {/* Burned Area */}
          <GeoMenuItem title="Burned Area" checked={null} tabIndex={-5}>
            {geoBurnedAreaMODIS && geoBurnedAreaMODIS.length > 0 && (
              <BurnedAreaPanel geoBurnedAreaMODIS={geoBurnedAreaMODIS} countryIso={countryIso} />
            )}
            {!geoBurnedAreaMODIS.length && !error && <p>Found no data.</p>}
            {!geoBurnedAreaMODIS && error && (
              <p className="geo-map-alt-message">An error has occured while fetching the statistics: {error}</p>
            )}
            {!geoBurnedAreaMODIS && <p className="geo-map-alt-message">Loading...</p>}
          </GeoMenuItem>
        </div>
      )}
    </div>
  )
}

export default GeoMapMenuStatistics
