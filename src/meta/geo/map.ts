import { LayerKey, LayerSectionKey } from './layer'
import { MosaicLayerKey } from './mosaic'

export type MapLayerKey = `${LayerSectionKey}-${LayerKey}` | MosaicLayerKey
