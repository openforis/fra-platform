import { Region } from './region'

export enum RegionGroupName {
  'fra2020' = 'fra2020',
  'secondary' = 'secondary',
  'global' = 'global',
}

export interface RegionGroup {
  id: number
  name: RegionGroupName
  order: number
  regions: Array<Region>
}
