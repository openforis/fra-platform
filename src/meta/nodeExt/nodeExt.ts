import { CountryIso } from 'meta/area'

export enum ColumnNodeExtType {
  text = 'text',
  select = 'select',
  multiselect = 'multiselect',
}

export enum NodeExtType {
  contact = 'contact',
  node_ext = 'node_ext',
}

export type NodeExt<Datum = any> = {
  readonly uuid: string
  readonly countryIso: CountryIso
  readonly type: NodeExtType
  props: Record<string, Datum>
}
