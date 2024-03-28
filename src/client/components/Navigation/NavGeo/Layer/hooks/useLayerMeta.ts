import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { LayerControlType } from 'meta/geo/layer'

import { LayerMeta, LayerProps } from 'client/components/Navigation/NavGeo/Layer/types'

export const useLayerMeta = (props: Pick<LayerProps, 'layer'>): LayerMeta => {
  const { layer } = props
  const { isCustomAsset, metadata, options, key } = layer
  const { titleKey } = metadata ?? {}
  const { agreementLayer, gteTreeCoverPercent, years } = options ?? {}

  const { t } = useTranslation()

  return useMemo<LayerMeta>(() => {
    let type: LayerControlType
    if (isCustomAsset) {
      type = LayerControlType.CustomAsset
    } else if (gteTreeCoverPercent !== undefined) {
      type = LayerControlType.TreeCoverPercent
    } else if (years !== undefined) {
      type = LayerControlType.Year
    } else if (agreementLayer !== undefined) {
      type = LayerControlType.Agreement
    }

    const fetchOnSelect = !type
    const title = titleKey ? t(titleKey) : key

    return { fetchOnSelect, key, metadata, title, type }
  }, [agreementLayer, gteTreeCoverPercent, isCustomAsset, key, metadata, t, titleKey, years])
}
