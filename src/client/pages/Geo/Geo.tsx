import './geo.scss'
import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import Loading from 'client/components/Loading'

const MapWrapper = React.lazy(() => import('./MapWrapper'))

const Geo: React.FC = () => {
  const user = useUser()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const isReviewer = Users.isReviewer(user, countryIso, cycle)

  const isAdmin = Users.isAdministrator(user)

  if (!isReviewer && !isAdmin) {
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
