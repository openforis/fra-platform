import { useMemo } from 'react'

import { LayerControlType } from 'meta/geo/layer'

import { useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus, LayerState } from 'client/store/ui/geo/stateType'
import { LayerMetaProps, LayerUi } from 'client/components/Navigation/NavGeo/Layer/types'

const defaultLayerState: LayerState = { opacity: 1, selected: false, status: LayerFetchStatus.Unfetched }

export const useLayerUi = (props: LayerMetaProps): LayerUi => {
  const { layerMeta, section } = props
  const { key: layerKey, metadata, type: layerType } = layerMeta
  const { palette } = metadata ?? {}
  const { key: sectionKey } = section

  const layerState = useGeoLayer(sectionKey, layerKey)
  const { opacity, options, selected, status } = layerState ?? defaultLayerState
  const { agreementLayer } = { agreementLayer: { level: 1 }, ...options }

  return useMemo<LayerUi>(() => {
    // Show Custom Asset control when the layer fetch is loading
    const isCustomAssetLoading = layerType === LayerControlType.CustomAsset && status === LayerFetchStatus.Loading
    const showControl = Boolean(layerType) && (selected || isCustomAssetLoading)

    let backgroundColor = palette?.at(0)
    if (layerType === LayerControlType.Agreement) {
      backgroundColor = palette?.at(agreementLayer.level - 1)
    }

    return { backgroundColor, opacity, selected, showControl, status }
  }, [agreementLayer.level, layerType, opacity, palette, selected, status])
}
