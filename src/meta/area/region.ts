import { RegionCode } from 'meta/area/regionCode'
import type { Subregion } from 'meta/area/subregion'
import { Lang } from 'meta/lang'

export interface Region {
  name: string
  regionCode: RegionCode
  sortIndex: Record<Lang, number>
  subregions?: Array<Subregion>
}
