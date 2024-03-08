import { useMemo } from 'react'

import { Layer, LayerSectionKey } from 'meta/geo'

import { useGeoLayer } from 'client/store/ui/geo'
import { useCountSectionSelectedLayers } from 'client/pages/Geo/GeoMap/hooks/useCountSectionSelectedLayers'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

type Returned = {
  currentSelectedLevel: number
  eligiblePalette: Array<string>
  selectedLayersCount: number
}

export const useAgreementLevelSelectorData = (props: Props): Returned => {
  const { layer, sectionKey } = props
  const layerKey = layer.key

  const layerState = useGeoLayer(sectionKey, layerKey)
  const currentSelectedLevel = layerState?.options?.agreementLayer?.level

  const agreementPalette = layer.metadata?.palette
  const selectedLayersCount = useCountSectionSelectedLayers({ ignoreAgreementLayer: true, sectionKey })

  return useMemo<Returned>(() => {
    let eligiblePalette: Array<string> = []
    if (agreementPalette && currentSelectedLevel !== undefined) {
      eligiblePalette = agreementPalette.slice(currentSelectedLevel - 1, selectedLayersCount)
    }

    return { currentSelectedLevel, eligiblePalette, selectedLayersCount }
  }, [agreementPalette, currentSelectedLevel, selectedLayersCount])
}
