import { Layer, LayerSection } from 'meta/geo'
import { LayerControlType } from 'meta/geo/layer'

import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

export type LayerProps = {
  layer: Layer
  section: LayerSection
}

export type LayerMeta = Pick<Layer, 'key' | 'metadata'> & {
  fetchOnSelect: boolean
  title: string
  type?: LayerControlType
}

export type LayerUi = {
  backgroundColor?: string
  opacity: number
  selected: boolean
  showControl: boolean
  status: LayerFetchStatus
}

export type LayerMetaProps = Pick<LayerProps, 'section'> & { layerMeta: LayerMeta }
