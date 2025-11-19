import { AreaCode } from 'meta/area/areaCode'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  countryIso: AreaCode
  cycle: Cycle
  user: User
}

export const canViewGeo = (props: Props): boolean => {
  return Users.hasRoleInCountry(props)
}
