import { GeoMapSelectors } from 'client/store/geo/map/selectors'
import { GeoMapOptions } from 'client/store/geo/map/state'
import { useAppSelector } from 'client/store/hooks'

export const useGeoMapOptions = (): Partial<GeoMapOptions> => useAppSelector(GeoMapSelectors.getOptions)
