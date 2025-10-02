import { Lang } from 'meta/lang'

import { RegionCode } from './regionCode'

export interface Region {
  regionCode: RegionCode
  name: string
  labels: Record<Lang, string>
}
