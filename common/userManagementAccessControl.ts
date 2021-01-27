const R = require('ramda')

const {
  isAdministrator,
  isNationalCorrespondent,
  isAlternateNationalCorrespondent,
  nationalCorrespondent,
  alternateNationalCorrespondent,
  reviewer,
  collaborator
} = require('./countryRole')

const rolesAllowedToChange = (countryIso, userInfo) => {

  if (isAdministrator(userInfo))
    return [reviewer.role, nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role]

  if (isNationalCorrespondent(countryIso, userInfo) || isAlternateNationalCorrespondent(countryIso, userInfo))
    return [collaborator.role]

  return []
}

const isAllowedToChangeRole = (countryIso, userInfo) => R.not(R.isEmpty(rolesAllowedToChange(countryIso, userInfo)))

module.exports = {
  rolesAllowedToChange,
  isAllowedToChangeRole
}
