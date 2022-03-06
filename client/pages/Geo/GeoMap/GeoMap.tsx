import './geoMap.scss'
import 'ol/ol.css'
import React, { useEffect, useRef, useState } from 'react'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

const GeoMap: React.FC = () => {
  const [map, setMap] = useState<Map>()
  const mapRef = useRef<Map>()
  const mapElement = useRef()

  mapRef.current = map

  useEffect(() => {
    // a placeholder background map for now
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    })
    setMap(initialMap)
  }, [])

  return <div ref={mapElement} className="geo-map" />
}

export default GeoMap
