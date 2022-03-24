import './geoMap.scss'
import React, { useEffect, useRef } from 'react'

type Props = {
  center: google.maps.LatLngLiteral
  zoom: number
}

const GeoMap: React.FC<Props> = (props: Props) => {
  const { center, zoom } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line no-new
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    })
  }, [])

  return <div ref={ref} id="geo-map" />
}

export default GeoMap
