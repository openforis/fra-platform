import './geoMapWrapper.scss'
import React from 'react'

import { Status, Wrapper } from '@googlemaps/react-wrapper'

import Loading from 'client/components/Loading'
import GeoMap from 'client/pages/Geo/GeoMap'
import StatisticsSidePanel from 'client/pages/Geo/StatisticsSidePanel'

// @ts-ignore
// from webpack DefinePlugin
const apiKey = __GOOGLE_MAPS_API_KEY__

const GeoMapWrapper: React.FC = () => {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <Loading />
      case Status.FAILURE:
        // TODO: improve error handling
        return <p>Error</p>
      case Status.SUCCESS:
        return (
          <GeoMap>
            <StatisticsSidePanel />
          </GeoMap>
        )
      // this should never happen
      default:
        return null
    }
  }

  return <Wrapper apiKey={apiKey} render={render} />
}

export default GeoMapWrapper
