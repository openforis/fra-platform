import { ApiEndPoint } from 'meta/api/endpoint'
import { burnedAreaLayers } from 'meta/geo/burnedArea/layers'
import { forestLayers } from 'meta/geo/forest/layers'
import { LayerSection } from 'meta/geo/layer/section'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'
import { protectedAreaLayers } from 'meta/geo/protectedArea/layers'

export const sections: Array<LayerSection> = [forestLayers, protectedAreaLayers, burnedAreaLayers]

export type SectionsApiEndpoint = Record<LayerSectionKey, string>

export const sectionsApiEndpoint: SectionsApiEndpoint = {
  [LayerSectionKey.Forest]: ApiEndPoint.Geo.Layers.forest(),
  [LayerSectionKey.BurnedArea]: ApiEndPoint.Geo.Layers.burnedArea(),
  [LayerSectionKey.ProtectedArea]: ApiEndPoint.Geo.Layers.protectedArea(),
}

export type SectionsMap = Record<LayerSectionKey, LayerSection>

export const sectionsMap: SectionsMap = {
  [LayerSectionKey.BurnedArea]: burnedAreaLayers,
  [LayerSectionKey.Forest]: forestLayers,
  [LayerSectionKey.ProtectedArea]: protectedAreaLayers,
}
