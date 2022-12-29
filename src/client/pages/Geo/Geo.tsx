import './geo.scss'
import React, { Suspense } from 'react'

import Loading from '@client/components/Loading'
import CountrySelect from '@client/components/PageLayout/CountrySelect'

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
