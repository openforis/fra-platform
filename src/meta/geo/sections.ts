import { ApiEndPoint } from '@meta/api/endpoint'

import { burnedAreaLayers, forestLayers, LayerSection, LayerSectionKey, protectedAreaLayers } from '.'

export const sections: Array<LayerSection> = [forestLayers, burnedAreaLayers, protectedAreaLayers]

export const GLOBAL_OPACITY_KEY = 'global_opacity'

export type SectionsApiEndpoint = Record<LayerSectionKey, string>

export const sectionsApiEndpoint: SectionsApiEndpoint = {
  [LayerSectionKey.Forest]: ApiEndPoint.Geo.Layers.forest(),
  [LayerSectionKey.BurnedArea]: ApiEndPoint.Geo.Layers.burnedArea(),
  [LayerSectionKey.ProtectedArea]: ApiEndPoint.Geo.Layers.protectedArea(),
}
