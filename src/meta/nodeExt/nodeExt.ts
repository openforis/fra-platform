import { CountryIso } from 'meta/area/countryIso'
import { NodeValue } from 'meta/assessment/node'

export enum NodeExtType {
  contact = 'contact',
  node = 'node',
  dashboard = 'dashboard',
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
