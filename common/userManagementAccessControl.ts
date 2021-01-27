import * as R from 'ramda'

import {
  isAdministrator,
  isNationalCorrespondent,
  isAlternateNationalCorrespondent,
  nationalCorrespondent,
  alternateNationalCorrespondent,
  reviewer,
  collaborator,
} from './countryRole'

export const rolesAllowedToChange = (countryIso: any, userInfo: any) => {
  if (isAdministrator(userInfo))
    return [reviewer.role, nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role]

  if (isNationalCorrespondent(countryIso, userInfo) || isAlternateNationalCorrespondent(countryIso, userInfo))
    return [collaborator.role]

  return []
}

export const isAllowedToChangeRole = (countryIso: any, userInfo: any) =>
  R.not(R.isEmpty(rolesAllowedToChange(countryIso, userInfo)))

export default {
  rolesAllowedToChange,
  isAllowedToChangeRole,
}
