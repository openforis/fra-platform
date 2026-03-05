import { RegionCode } from 'meta/area/regionCode'
import { SubRegion } from 'meta/area/subRegion'
import { Lang } from 'meta/lang'

export interface Region {
  name: string
  regionCode: RegionCode
  sortIndex: Record<Lang, number>
  subRegions?: Array<SubRegion>
}
