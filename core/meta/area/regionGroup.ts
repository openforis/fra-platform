import { Region } from './region'

export interface RegionGroup {
  id: number
  name: string
  order: number
  regions: Array<Region>
}
