import './Map.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useShowUnBoundaries } from 'client/store/geo/boundaries/hooks/boundaries'

import { useFetchUnBoundaries } from './hooks/useFetchUnBoundaries'
import { useGeoMap } from './hooks/useGeoMap'
import { useMapLayersHandler } from './hooks/useMapLayersHandler'
import { useMapOptionsUpdateListeners } from './hooks/useMapOptionsUpdateListeners'

type Props = {
  viewport?: google.maps.LatLngBoundsLiteral
}

const Map: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, viewport } = props
  const { t } = useTranslation()
  const showUnBoundaries = useShowUnBoundaries()

  const { map, ref } = useGeoMap({ viewport })
  useMapLayersHandler()
  useFetchUnBoundaries()
  useMapOptionsUpdateListeners()

  return (
    <>
      <div ref={ref} id="geo-map" />
      {showUnBoundaries && <div className="geo-un-boundaries-disclaimer">{t('geo.unBoundariesDisclaimer')}</div>}
      {map !== null ? children : null}
    </>
  )
}

export default Map
