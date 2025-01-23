import './MapWrapper.scss'
import React from 'react'

import { Status, Wrapper, WrapperProps } from '@googlemaps/react-wrapper'

import Loading from 'client/components/Loading'
import Map from 'client/pages/Kiosk/LatestActivities/Map'

// @ts-ignore
// from webpack DefinePlugin
const apiKey: string = __GOOGLE_MAPS_API_KEY__

const Components: Record<Status, React.FC> = {
  [Status.LOADING]: () => <Loading />,
  [Status.FAILURE]: () => (
    <div className="kiosk-latest-activities__map-error">There was a problem while loading the map.</div>
  ),
  [Status.SUCCESS]: () => <Map />,
}

const MapWrapper: React.FC = () => {
  const render: WrapperProps['render'] = (status) => {
    const Component = Components[status]

    return <Component />
  }

  return <Wrapper apiKey={apiKey} render={render} />
}

export default MapWrapper
