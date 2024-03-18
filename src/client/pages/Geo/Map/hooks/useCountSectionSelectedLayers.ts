import { useMemo } from 'react'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { useGeoLayerSection } from 'client/store/ui/geo'

export const useCountSectionSelectedLayers = (props: {
  ignoreAgreementLayer?: boolean
  sectionKey: LayerSectionKey
}) => {
  const { ignoreAgreementLayer = false, sectionKey } = props
  const sectionState = useGeoLayerSection(sectionKey)

  const selectedLayersCount = useMemo<number>(() => {
    if (sectionState === undefined) return 0
    let count = 0

    Object.keys(sectionState).forEach((layerKey) => {
      if (ignoreAgreementLayer && layerKey === 'Agreement') return

      if (sectionState[layerKey as LayerKey].selected) {
        count += 1
      }
    })
    return count
  }, [ignoreAgreementLayer, sectionState])

  return selectedLayersCount
}
