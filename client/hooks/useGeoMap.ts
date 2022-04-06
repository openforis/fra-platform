import { useContext, createContext } from 'react'

export const MapContext = createContext<google.maps.Map | null>(null)

const useGeoMap = () => {
  const map = useContext(MapContext)

  return map
}

export default useGeoMap
