import './geoMapMenuStatistics.scss'
import React, { useCallback, useEffect, useState } from 'react'

import { useSelectedPanel } from '@client/store/ui/geo'
import { useCountryIso } from '@client/hooks'
import { getForestEstimationData } from '@client/pages/Geo/utils/forestEstimations'

import GeoMapMenuButton from '../GeoMapMenuButton'
import GeoMenuItem from '../GeoMapMenuItem'
import TreeCoverAreaPanel from './TreeCoverAreaPanel'

const GeoMapMenuStatistics: React.FC = () => {
  const [statisticsData, setStatisticsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [year, setYear] = useState(2020)
  const countryIso = useCountryIso()

  const selectedPanel = useSelectedPanel()

  const fetchStatisticsHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    let data: [string, number, number][] = []
    try {
      const forestEstimations = await getForestEstimationData(countryIso, year)
      data = forestEstimations.data
    } catch (error) {
      setError(error.message)
    }
    setStatisticsData(data)
    setIsLoading(false)
  }, [countryIso, year])

  useEffect(() => {
    setYear(2020) // Default value is 2020 for now, assigned like this again to avoid typescript warnings.
    fetchStatisticsHandler()
  }, [fetchStatisticsHandler])

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
            {!isLoading && error && <p>An error has occured while fetching the statistics: {error}</p>}
            {isLoading && <p>Loading...</p>}
          </GeoMenuItem>
        </div>
      )}
    </div>
  )
}

export default GeoMapMenuStatistics
