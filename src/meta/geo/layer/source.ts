import { LayerKey } from 'meta/geo/layer/key'

export interface LayerSource {
  key: LayerKey
  options?: {
    gteTreeCoverPercent?: number
    assetId?: string
    year?: number
    agreement?: {
      layers: Array<LayerSource>
      gteAgreementLevel: number
    }
  }
}
