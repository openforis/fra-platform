const R = require('ramda')
const assert = require('assert')
// The returned value is of the form:
// {role: <ROLE>, label: <LABEL>}

const administrator = { role: 'ADMINISTRATOR', labelKey: 'user.roles.administrator' }
const reviewer = { role: 'REVIEWER', labelKey: 'user.roles.reviewer' }
const nationalCorrespondent = { role: 'NATIONAL_CORRESPONDENT', labelKey: 'user.roles.nationalCorrespondent' }
const alternateNationalCorrespondent = {
  role: 'ALTERNATE_NATIONAL_CORRESPONDENT',
  labelKey: 'user.roles.alternateNationalCorrespondent'
}
const collaborator = { role: 'COLLABORATOR', labelKey: 'user.roles.collaborator' }
const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

const roles = {
  [administrator.role]: administrator,
  [reviewer.role]: reviewer,
  [nationalCorrespondent.role]: nationalCorrespondent,
  [alternateNationalCorrespondent.role]: alternateNationalCorrespondent,
  [collaborator.role]: collaborator
}

const roleKeys = R.pipe(
  R.values,
  R.map(R.prop('role'))
)(roles)

const getRoleLabelKey = (roleName) => R.path([roleName, 'labelKey'], roles)

const hasRole = (role, roles) => R.find(R.propEq('role', role))(roles)

const getCountryRoles = (countryIso, userInfo) => R.filter(R.propEq('countryIso', countryIso))(userInfo.roles)
const getCountryRole = (countryIso, userInfo) => getCountryRoles(countryIso, userInfo)[0]

const roleForCountry = (countryIso, userInfo) => {
  if (!userInfo) return noRole
  if (hasRole('ADMINISTRATOR', userInfo.roles)) return administrator
  const rolesForCountry = getCountryRoles(countryIso, userInfo)
  assert(rolesForCountry.length < 2, `Ambiguous roles found for user ${userInfo} and country ${countryIso}`)
  if (rolesForCountry.length === 0) return noRole
  const roleObj = roles[rolesForCountry[0].role]
  if (!roleObj) return noRole
  return roleObj
}

const hasUserRole = (countryIso, userInfo, roleObj) => roleForCountry(countryIso, userInfo).role === roleObj.role

const isReviewer = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, reviewer) || hasUserRole(countryIso, userInfo, administrator)
const isNationalCorrespondent = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, nationalCorrespondent)
const isAlternateNationalCorrespondent = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, alternateNationalCorrespondent)
const isCollaborator = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, collaborator)
const hasNoRole = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, noRole)

const isAdministrator = userInfo => hasRole('ADMINISTRATOR', userInfo.roles)

module.exports.getCountryRole = getCountryRole
module.exports.roleForCountry = roleForCountry

module.exports.isReviewer = isReviewer
module.exports.isNationalCorrespondent = isNationalCorrespondent
module.exports.isAlternateNationalCorrespondent = isAlternateNationalCorrespondent
module.exports.isCollaborator = isCollaborator
module.exports.hasNoRole = hasNoRole
module.exports.isAdministrator = isAdministrator

module.exports.reviewer = reviewer
module.exports.administrator = administrator
module.exports.nationalCorrespondent = nationalCorrespondent
module.exports.alternateNationalCorrespondent = alternateNationalCorrespondent
module.exports.collaborator = collaborator
module.exports.noRole = noRole

module.exports.roles = R.values(roles)
module.exports.roleKeys = roleKeys
module.exports.getRoleLabelKey = getRoleLabelKey
