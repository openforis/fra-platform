import './Map.scss'
import React, { useCallback, useState } from 'react'

import { Activity } from 'meta/kiosk'

import ActivityList from 'client/pages/Kiosk/RecentHighlights/ActivityList'
import RecentHighlightsButton from 'client/pages/Kiosk/RecentHighlights/RecentHighlightsButton'

import { useFetchAndMarkActivities } from './hooks/useFetchAndMarkActivities'
import { useLatestActivitiesMap } from './hooks/useLatestActivitiesMap'

const Map: React.FC = () => {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)

  const handleExpand = useCallback((activity: Activity, map: google.maps.Map) => {
    setExpandedActivity((prev) => (prev === activity.id ? null : activity.id))
    map?.panTo({ lat: activity.lat, lng: activity.lng })
  }, [])

  const { addMarkers, map, ref } = useLatestActivitiesMap({ expandedActivity, handleExpand })
  const { data } = useFetchAndMarkActivities({ addMarkers, map })

  return (
    <>
      <div ref={ref} className="kiosk-latest-activities__map" />
      {map !== null && (
        <>
          <ActivityList activities={data} expandedActivity={expandedActivity} handleExpand={handleExpand} map={map} />
          <RecentHighlightsButton />
        </>
      )}
    </>
  )
}

export default Map
