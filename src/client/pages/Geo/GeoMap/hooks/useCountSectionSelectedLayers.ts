import { useEffect, useState } from 'react'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { useGeoLayerSection } from 'client/store/ui/geo'

export const useCountSectionSelectedLayers = (sectionKey: LayerSectionKey) => {
  const [selectedLayersCount, setSelectedLayerCount] = useState(0)
  const sectionState = useGeoLayerSection(sectionKey)

  useEffect(() => {
    if (sectionState === undefined) return
    let count = 0
    Object.keys(sectionState).forEach((layerKey) => {
      if (sectionState[layerKey as LayerKey].selected) {
        count += 1
      }
    })
    setSelectedLayerCount(count)
  }, [sectionState])

  return selectedLayersCount
}
