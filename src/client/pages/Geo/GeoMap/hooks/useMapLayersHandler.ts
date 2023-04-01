import { useAgreementLayerHandler, useForestLayersHandler } from '.'

export const useMapLayersHandler = () => {
  useAgreementLayerHandler()
  useForestLayersHandler()
}
