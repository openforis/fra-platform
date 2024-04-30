import './geo.scss'
import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCanViewGeo } from 'client/store/user/hooks'
import Loading from 'client/components/Loading'

const MapWrapper = React.lazy(() => import('./MapWrapper'))

const Geo: React.FC = () => {
  const canViewGeo = useCanViewGeo()

  if (!canViewGeo) {
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
