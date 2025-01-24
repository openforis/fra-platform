import './Map.scss'
import React from 'react'

import { useFetchAndMarkActivities } from './hooks/useFetchAndMarkActivities'
import { useLatestActivitiesMap } from './hooks/useLatestActivitiesMap'

const Map: React.FC = () => {
  const { addMarkers, map, ref } = useLatestActivitiesMap()
  useFetchAndMarkActivities({ addMarkers, map })

  return <div ref={ref} className="kiosk-latest-activities__map" />
}

export default Map
