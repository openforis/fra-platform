import { useMemo } from 'react'

import { ForestKey, LayerKey, LayerSectionKey } from 'meta/geo'

import { useGeoLayerSection } from 'client/store/ui/geo'

type Props = {
  ignoreAgreementLayer?: boolean
  sectionKey: LayerSectionKey
}

export const useCountSectionSelectedLayers = (props: Props) => {
  const { ignoreAgreementLayer = false, sectionKey } = props
  const sectionState = useGeoLayerSection(sectionKey)

  return useMemo<number>(() => {
    if (sectionState === undefined) return 0
    let count = 0

    Object.keys(sectionState).forEach((layerKey) => {
      if (ignoreAgreementLayer && layerKey === ForestKey.Agreement) return

      if (sectionState[layerKey as LayerKey].selected) {
        count += 1
      }
    })
    return count
  }, [ignoreAgreementLayer, sectionState])
}
