import React from 'react'

import { useIsGeoRoute } from 'client/hooks'
import Center from 'client/components/PageLayout/Toolbar/Options/GeoOptions/Center'
import GeoToggle from 'client/components/PageLayout/Toolbar/Options/GeoOptions/GeoToggle'
import MapType from 'client/components/PageLayout/Toolbar/Options/GeoOptions/MapType'
import Zoom from 'client/components/PageLayout/Toolbar/Options/GeoOptions/Zoom'

const GeoOptions: React.FC = () => {
  const geoRoute = useIsGeoRoute()

  return (
    <>
      {geoRoute && (
        <>
          <Center />
          <div className="toolbar__separator" />
          <Zoom />
          <div className="toolbar__separator" />
          <MapType />
        </>
      )}
      <div className="toolbar__separator" />
      <GeoToggle />
    </>
  )
}

export default GeoOptions
