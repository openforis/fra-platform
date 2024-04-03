import useCountryIsoChangeHandler from './useCountryIsoChangeHandler'
import { useFetchMosaicLayer } from './useFetchMosaicLayer'

export const useMapLayersHandler = () => {
  useCountryIsoChangeHandler()
  useFetchMosaicLayer()
}

export default useMapLayersHandler
