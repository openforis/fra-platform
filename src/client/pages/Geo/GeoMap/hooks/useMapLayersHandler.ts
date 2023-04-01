import { useAgreementLayerHandler, useForestLayersHandler, useProtectedAreaLayersHandler } from '.'

export const useMapLayersHandler = () => {
  useAgreementLayerHandler()
  useForestLayersHandler()
  useProtectedAreaLayersHandler()
}
