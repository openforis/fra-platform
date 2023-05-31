import './geoMapWrapper.scss'
import React from 'react'

import { Status, Wrapper } from '@googlemaps/react-wrapper'

import Loading from 'client/components/Loading'

import GeoMap from '../GeoMap'
import GeoMapMenuData from '../GeoMap/GeoMapMenuData'
import GeoMapMenuMosaic from '../GeoMap/GeoMapMenuMosaic'
// import GeoMapMenuRecipes from '../GeoMap/GeoMapMenuRecipes'
import GeoMapMenuStatistics from '../GeoMap/GeoMapMenuStatistics'

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
            <div className="geo-map-menu-container">
              <GeoMapMenuMosaic />
              <GeoMapMenuData />
              {/* <GeoMapMenuRecipes /> */}
              <GeoMapMenuStatistics />
            </div>
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
