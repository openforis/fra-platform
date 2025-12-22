import { AreaCode } from 'meta/area/areaCode'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

export type PropsSections = {
  canSeeUserActivities: boolean
  countryIso: AreaCode
  cycle: Cycle
  user: User
}
