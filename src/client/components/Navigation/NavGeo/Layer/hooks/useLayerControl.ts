import { useMemo } from 'react'

import { Layer, LayerControlType, LayerSectionKey } from 'meta/geo/layer'

import { useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

type Returned = {
  fetchOnSelect: boolean
  layerControlType: LayerControlType | null
  opacity: number
  selected: boolean
  status: LayerFetchStatus
  title: string
}

export const useLayerControl = (props: Props): Returned => {
  const { layer, sectionKey } = props
  const layerState = useGeoLayer(sectionKey, layer.key)

  return useMemo<Returned>(() => {
    const { options } = layer

    let layerControlType: LayerControlType | null = null

    if (layer.isCustomAsset) {
      layerControlType = LayerControlType.CustomAsset
    } else if (options?.gteTreeCoverPercent !== undefined) {
      layerControlType = LayerControlType.TreeCoverPercent
    } else if (options?.years !== undefined) {
      layerControlType = LayerControlType.Year
    } else if (options?.agreementLayer !== undefined) {
      layerControlType = LayerControlType.Agreement
    }

    const fetchOnSelect = layerControlType === null
    const opacity = layerState?.opacity ?? 1
    const selected = layerState?.selected ?? false
    const status = layerState?.status ?? LayerFetchStatus.Unfetched
    const title = layer.metadata?.title ?? layer.key

    return {
      fetchOnSelect,
      layerControlType,
      opacity,
      selected,
      status,
      title,
    }
  }, [layer, layerState])
}
