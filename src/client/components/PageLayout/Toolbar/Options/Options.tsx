import './Options.scss'
import React from 'react'

import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsGeoRoute } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import GeoOptions from 'client/components/PageLayout/Toolbar/Options/GeoOptions'
import LinkPrint from 'client/components/PageLayout/Toolbar/Options/LinkPrint'

const Options: React.FC = () => {
  const { countryIso } = useCountryRouteParams()
  const geoRoute = useIsGeoRoute()
  const user = useUser()
  const cycle = useCycle()

  const withGeo = Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle)

  return (
    <div className="toolbar-options">
      {!geoRoute && <LinkPrint />}

      {withGeo && <GeoOptions />}
    </div>
  )
}

export default Options
