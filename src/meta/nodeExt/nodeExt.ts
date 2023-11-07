import { CountryIso } from 'meta/area'

export enum ColumnNodeExtType {
  text = 'text',
  select = 'select',
  multiselect = 'multiselect',
}

export enum NodeExtType {
  contact = 'contact',
  node = 'node',
}

export type NodeExt<Props = unknown, Value = unknown> = {
  readonly countryIso: CountryIso
  readonly id?: number
  readonly type?: NodeExtType
  readonly uuid: string
  props: Props
  value: Value
}
