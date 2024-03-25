import './MapWrapper.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Status, Wrapper, WrapperProps } from '@googlemaps/react-wrapper'
import { TFunction } from 'i18next'

import Loading from 'client/components/Loading'
import Map from 'client/pages/Geo/Map'
// import StatisticsSidePanel from 'client/pages/Geo/StatisticsSidePanel'

// @ts-ignore
// from webpack DefinePlugin
const apiKey: string = __GOOGLE_MAPS_API_KEY__

const Components: Record<Status, React.FC<{ t: TFunction }>> = {
  [Status.LOADING]: () => <Loading />,
  [Status.FAILURE]: ({ t }) => (
    <>
      {/* <StatisticsSidePanel /> */}
      <div className="geo-map-error-message">{t<string>('geo.error.map.failedToLoad')}</div>
    </>
  ),
  [Status.SUCCESS]: () => <Map>{/* <StatisticsSidePanel /> */}</Map>,
}

const MapWrapper: React.FC = () => {
  const { t } = useTranslation()

  const render: WrapperProps['render'] = (status) => {
    const Component = Components[status]

    return <Component t={t} />
  }

  return <Wrapper apiKey={apiKey} render={render} />
}

export default MapWrapper
