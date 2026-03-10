import type { Region } from 'meta/area/region'
import { SubregionCode } from 'meta/area/subregionCode'

export type Subregion = Pick<Region, 'name' | 'sortIndex'> & {
  regionCode: SubregionCode
}
