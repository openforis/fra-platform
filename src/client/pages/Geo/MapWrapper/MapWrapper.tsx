import './MapWrapper.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Status, Wrapper } from '@googlemaps/react-wrapper'

import Loading from 'client/components/Loading'
import Map from 'client/pages/Geo/Map'
import StatisticsSidePanel from 'client/pages/Geo/StatisticsSidePanel'

// @ts-ignore
// from webpack DefinePlugin
const apiKey = __GOOGLE_MAPS_API_KEY__

const MapWrapper: React.FC = () => {
  const { t } = useTranslation()

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <Loading />
      case Status.FAILURE:
        return (
          <>
            <StatisticsSidePanel />
            <div className="geo-map-error-message">{t('geo.error.map.failedToLoad')}</div>
          </>
        )
      case Status.SUCCESS:
        return (
          <Map>
            <StatisticsSidePanel />
          </Map>
        )
      // this should never happen
      default:
        return null
    }
  }

  return <Wrapper apiKey={apiKey} render={render} />
}

export default MapWrapper
