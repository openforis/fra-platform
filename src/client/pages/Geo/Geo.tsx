import './geo.scss'
import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { Authorizer } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Loading from 'client/components/Loading'

const MapWrapper = React.lazy(() => import('./MapWrapper'))

const Geo: React.FC = () => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const user = useUser()

  if (!Authorizer.canViewGeo({ cycle, countryIso, user })) {
    return <Navigate replace to={Routes.Cycle.path.relative} />
  }

  return (
    <div className="geo-container">
      <Suspense fallback={<Loading />}>
        <MapWrapper />
      </Suspense>
    </div>
  )
}

export default Geo
