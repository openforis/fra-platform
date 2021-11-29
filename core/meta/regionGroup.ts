import { Region } from '@core/country'

export interface RegionGroup {
  id: number
  name: string
  order: number
  regions: Array<Region>
}
