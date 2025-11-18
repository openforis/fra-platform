import { AreaCode } from 'meta/area/areaCode'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import {
  isAdministrator,
  isAlternateNationalCorrespondent,
  isNationalCorrespondent,
  isReviewer,
} from 'meta/user/users/isRole'

export const getRolesAllowedToEdit = (props: { user: User; countryIso: AreaCode; cycle: Cycle }): Array<RoleName> => {
  const { countryIso, cycle, user } = props
  if (isAdministrator(user)) {
    return [
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.VIEWER,
    ]
  }
  if (isNationalCorrespondent(user, countryIso, cycle) || isAlternateNationalCorrespondent(user, countryIso, cycle)) {
    return [RoleName.COLLABORATOR, RoleName.VIEWER]
  }
  return []
}

export const getRolesAllowedToView = (props: { user: User; countryIso: AreaCode; cycle: Cycle }): Array<RoleName> => {
  const { countryIso, cycle, user } = props

  if (isReviewer(user, countryIso, cycle)) {
    return [
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.REVIEWER,
    ]
  }

  return getRolesAllowedToEdit(props)
}
