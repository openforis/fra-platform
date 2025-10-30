import { useGeoMapOptions } from 'client/store/geo/map/hooks/map'
import { useOnUpdate } from 'client/hooks/onUpdate'
import { mapController } from 'client/geo/mapController'

export const useMapOptionsUpdateListeners = (): void => {
  const { mapTypeId, zoom } = useGeoMapOptions()

  useOnUpdate(() => {
    mapController.getMap().setMapTypeId(mapTypeId)
  }, [mapTypeId])

  useOnUpdate(() => {
    mapController.getMap().setZoom(zoom)
  }, [zoom])
}
