import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment'

export enum NodeExtCellType {
  text = 'text',
  select = 'select',
  multiselect = 'multiselect',
}

export enum NodeExtType {
  contact = 'contact',
  node = 'node',
}

export type NodeExt<Props, Value extends NodeValue | null = NodeValue> = {
  readonly countryIso?: CountryIso
  // readonly id: number
  parentUuid?: string
  props: Props
  readonly uuid: string
  type: NodeExtType
  value: Value
}
