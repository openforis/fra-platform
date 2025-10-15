import './Options.scss'
import React from 'react'

import classNames from 'classnames'

import { useCanViewGeo } from 'client/store/user/hooks/auth'
import { useIsGeoRoute } from 'client/hooks/routes'
import LinkData from 'client/components/PageLayout/LinkData'
import GeoOptions from 'client/components/PageLayout/Toolbar/Options/GeoOptions'
import LinkPrint from 'client/components/PageLayout/Toolbar/Options/LinkPrint'

const Options: React.FC = () => {
  const geoRoute = useIsGeoRoute()
  const canViewGeo = useCanViewGeo()

  return (
    <div className={classNames('toolbar-options', { geoRoute })}>
      <LinkData />

      {!geoRoute && <LinkPrint />}

      {canViewGeo && <GeoOptions />}
    </div>
  )
}

export default Options
