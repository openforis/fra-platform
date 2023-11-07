import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment'

export enum ColumnNodeExtType {
  text = 'text',
  select = 'select',
  multiselect = 'multiselect',
}

export enum NodeExtType {
  contact = 'contact',
  node = 'node',
}

export type NodeExt<Datum = object> = {
  readonly uuid: string
  readonly countryIso: CountryIso
  readonly type: NodeExtType
  props: Record<string, Datum>
  value: NodeValue
}
