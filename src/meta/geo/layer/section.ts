import { Layer } from 'meta/geo/layer/layer'
import { Recipe } from 'meta/geo/layer/recipe'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

export type LayerSection = {
  key: LayerSectionKey
  titleKey: string
  layers: Array<Layer>
  recipes?: Array<Recipe>
}
