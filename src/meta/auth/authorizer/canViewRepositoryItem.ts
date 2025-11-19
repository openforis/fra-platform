import { AreaCode } from 'meta/area/areaCode'
import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { canView } from 'meta/auth/authorizer/canView'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

type Props = {
  areaCode: AreaCode
  assessment: Assessment
  country: Country
  cycle: Cycle
  repositoryItem: RepositoryItem
  user: User
}

export const canViewRepositoryItem = (props: Props): boolean => {
  const { areaCode, assessment, country, cycle, repositoryItem, user } = props

  if (repositoryItem?.props?.public) {
    return canView({ assessment, cycle, country, areaCode, user })
  }

  return Users.hasRoleInCountry({ user, countryIso: areaCode, cycle })
}
