import { useGeoMapOptions } from 'client/store/ui/geo'
import { useOnUpdate } from 'client/hooks'
import { mapController } from 'client/utils'

export const useMapOptionsUpdateListeners = (): void => {
  const { mapTypeId, zoom } = useGeoMapOptions()

  useOnUpdate(() => {
    mapController.getMap().setMapTypeId(mapTypeId)
  }, [mapTypeId])

  useOnUpdate(() => {
    mapController.getMap().setZoom(zoom)
  }, [zoom])
}
