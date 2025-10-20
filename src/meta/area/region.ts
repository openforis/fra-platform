import { Lang } from 'meta/lang'

import { RegionCode } from './regionCode'

export interface Region {
  name: string
  regionCode: RegionCode
  sortIndex: Record<Lang, number>
}
