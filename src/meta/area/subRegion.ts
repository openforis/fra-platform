import type { Region } from 'meta/area/region'
import { SubRegionCode } from 'meta/area/subRegionCode'

export type SubRegion = Pick<Region, 'name' | 'sortIndex'> & {
  regionCode: SubRegionCode
}
