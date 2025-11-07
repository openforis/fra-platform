import { RegionCode } from 'meta/area/regionCode'
import { Lang } from 'meta/lang'

export interface Region {
  name: string
  regionCode: RegionCode
  sortIndex: Record<Lang, number>
}
