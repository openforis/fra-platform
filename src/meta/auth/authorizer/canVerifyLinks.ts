import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'
import { Objects } from 'utils/objects'

type Props = {
  countryIso?: AreaCode
  cycle: Cycle
  user: User
}

export const canVerifyLinks = (props: Props): boolean => {
  const { countryIso, cycle, user } = props

  const isCountry = !Objects.isEmpty(countryIso) && Areas.isISOCountry(countryIso)
  if (!isCountry) return Users.isAdministrator(user)
  return (
    Users.isAdministrator(user) ||
    Users.isReviewer(user, countryIso, cycle) ||
    Users.isRegionalFocalPoint(user, countryIso, cycle)
  )
}
