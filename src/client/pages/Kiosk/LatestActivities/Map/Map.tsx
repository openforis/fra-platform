import './Map.scss'
import React from 'react'

import { useLatestActivitiesMap } from './hooks/useLatestActivitiesMap'

const Map: React.FC = () => {
  const { ref } = useLatestActivitiesMap()

  return <div ref={ref} className="kiosk-latest-activities__map" />
}

export default Map
