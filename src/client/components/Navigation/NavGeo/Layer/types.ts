import { LayerControlType } from 'meta/geo/layer/controlType'
import { Layer } from 'meta/geo/layer/layer'
import { LayerSection } from 'meta/geo/layer/section'

import { LayerFetchStatus } from 'client/store/geo/layers/state'

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
