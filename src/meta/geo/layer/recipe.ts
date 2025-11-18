import { LayerSource } from 'meta/geo/layer/source'

export interface Recipe {
  layers: Array<LayerSource>
  forestAreaDataProperty: string
  labelKey: string
}
