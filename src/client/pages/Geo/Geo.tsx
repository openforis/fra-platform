import './geo.scss'
import React, { Suspense } from 'react'

import CountrySelect from '@client/components/CountrySelect'
import Loading from '@client/components/Loading'

const GeoMapWrapper = React.lazy(() => import('./GeoMapWrapper'))

const Geo: React.FC = () => {
  return (
    <>
      <CountrySelect />
      <div className="geo-container">
        <Suspense fallback={<Loading />}>
          <GeoMapWrapper />
        </Suspense>
      </div>
    </>
  )
}

export default Geo
