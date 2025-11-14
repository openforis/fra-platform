import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { ForestKey } from 'meta/geo/forest/key'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'
import { sectionsMap } from 'meta/geo/sections'

import { useGeoLayers } from 'client/store/geo/layers/hooks/layers'

type Props = {
  ignoreAgreementLayer?: boolean
  sectionKey: LayerSectionKey
}

export const useCountSectionSelectedLayers = (props: Props): number => {
  const { ignoreAgreementLayer = false, sectionKey } = props
  const section = sectionsMap[sectionKey]
  const layersState = useGeoLayers()

  return useMemo<number>(() => {
    if (Objects.isEmpty(layersState)) return 0
    let count = 0

    section.layers.forEach(({ key: layerKey }) => {
      if (layerKey === ForestKey.Agreement && ignoreAgreementLayer) return
      if (layersState[layerKey]?.selected) {
        count += 1
      }
    })
    return count
  }, [ignoreAgreementLayer, layersState, section])
}
