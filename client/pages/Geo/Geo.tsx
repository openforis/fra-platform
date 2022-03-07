import './geo.scss'
import React, { useEffect, useState } from 'react'

const GeoMap = React.lazy(() => import('./GeoMap'))

const Geo: React.FC = () => {
  const [isRenderAllowed, setIsRenderAllowed] = useState(false)

  // makes the map fill remaining screen space nicely
  useEffect(() => {
    const main = document.getElementById('main')
    const mainDefaultVal = main.style.minHeight
    main.style.minHeight = '100vh'

    // don't render map until height is set or it will be rendered with a height of 0
    setIsRenderAllowed(true)

    return () => {
      main.style.minHeight = mainDefaultVal
    }
  }, [])

  return <div className="geo-container">{isRenderAllowed && <GeoMap />}</div>
}

export default Geo
