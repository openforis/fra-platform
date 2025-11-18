import { useMemo } from 'react'

import { Layer } from 'meta/geo/layer/layer'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

import { useGeoLayer } from 'client/store/geo/layers/hooks/layers'
import { useCountSectionSelectedLayers } from 'client/pages/Geo/Map/hooks/useCountSectionSelectedLayers'

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

  const layerState = useGeoLayer(layerKey)
  const currentSelectedLevel = layerState?.options?.agreementLayer?.level

  const agreementPalette = layer.metadata?.palette
  const selectedLayersCount = useCountSectionSelectedLayers({ ignoreAgreementLayer: true, sectionKey })

  return useMemo<Returned>(() => {
    let eligiblePalette: Array<string> = []
    if (agreementPalette && currentSelectedLevel !== undefined) {
      eligiblePalette = agreementPalette
    }

    return { currentSelectedLevel, eligiblePalette, selectedLayersCount }
  }, [agreementPalette, currentSelectedLevel, selectedLayersCount])
}
