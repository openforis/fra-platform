import { LayerKey } from 'meta/geo/layer/key'
import { MosaicLayerKey } from 'meta/geo/mosaic/layerKey'

import { UnBoundariesLayerKey } from './boundaries/layerKey'

export type MapLayerKey = LayerKey | MosaicLayerKey | UnBoundariesLayerKey
