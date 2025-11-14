import { LayerKey } from 'meta/geo/layer/key'
import { LayerMetadata } from 'meta/geo/layer/metadata'
import { LayerOptions } from 'meta/geo/layer/options'

export type Layer = {
  key: LayerKey
  isCustomAsset?: boolean
  options?: LayerOptions
  metadata?: LayerMetadata
}
