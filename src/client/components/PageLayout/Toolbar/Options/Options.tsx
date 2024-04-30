import './Options.scss'
import React from 'react'

import classNames from 'classnames'

import { useCanViewGeo } from 'client/store/user/hooks'
import { useIsGeoRoute } from 'client/hooks'
import GeoOptions from 'client/components/PageLayout/Toolbar/Options/GeoOptions'
import LinkPrint from 'client/components/PageLayout/Toolbar/Options/LinkPrint'

const Options: React.FC = () => {
  const geoRoute = useIsGeoRoute()
  const canViewGeo = useCanViewGeo()

  return (
    <div className={classNames('toolbar-options', { geoRoute })}>
      {!geoRoute && <LinkPrint />}

      {canViewGeo && <GeoOptions />}
    </div>
  )
}

export default Options
