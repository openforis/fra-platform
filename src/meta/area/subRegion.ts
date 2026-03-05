import { SubRegionCode } from 'meta/area/subRegionCode'
import { Lang } from 'meta/lang'

export interface SubRegion {
  name: string
  regionCode: SubRegionCode
  sortIndex: Record<Lang, number>
}
