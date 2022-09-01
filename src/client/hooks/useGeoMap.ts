import { useContext, createContext } from 'react'

export const MapContext = createContext<google.maps.Map | null>(null)

export const useGeoMap = () => {
  const map = useContext(MapContext)

  return map
}
