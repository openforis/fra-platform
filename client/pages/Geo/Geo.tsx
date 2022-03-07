import './geo.scss'
import React, { Suspense } from 'react'

import Loading from '@client/components/Loading'

const GeoMap = React.lazy(() => import('./GeoMap'))

const Geo: React.FC = () => {
  return (
    <div className="geo-container">
      <Suspense fallback={<Loading />}>
        <GeoMap />
      </Suspense>
    </div>
  )
}

export default Geo
