import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Layer, LayerControlType, LayerSectionKey } from 'meta/geo/layer'

import { useGeoLayer } from 'client/store/ui/geo'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

type Props = {
  layer: Layer
  sectionKey: LayerSectionKey
}

type Returned = {
  backgroundColor: string | undefined
  fetchOnSelect: boolean
  layerControlType: LayerControlType | null
  opacity: number
  selected: boolean
  shouldShowControl: boolean
  status: LayerFetchStatus
  title: string
}

export const useLayerControl = (props: Props): Returned => {
  const { layer, sectionKey } = props

  const { t } = useTranslation()

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

    const titleKey = layer.metadata?.titleKey
    const title = titleKey !== undefined ? t(titleKey) : layer.key

    // Show Custom Asset control when the layer fetch is loading
    const isCustomAssetLoading =
      layerControlType === LayerControlType.CustomAsset && status === LayerFetchStatus.Loading
    const shouldShowControl = layerControlType !== null && (selected || isCustomAssetLoading)

    const palette = layer.metadata?.palette
    let backgroundColor = palette?.at(0)

    if (layerControlType === LayerControlType.Agreement) {
      const agreementLevel = layerState?.options?.agreementLayer?.level ?? 1
      backgroundColor = palette?.at(agreementLevel - 1)
    }

    return {
      backgroundColor,
      fetchOnSelect,
      layerControlType,
      opacity,
      selected,
      shouldShowControl,
      status,
      title,
    }
  }, [layer, layerState, t])
}
