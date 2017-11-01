const R = require('ramda')

// Returns the most powerful role that the user has
// for a certain country (REVIEWER > NATIONAL_CORRESPONDENT)
// The returned value is of the form:
// {role: <ROLE>, label: <LABEL>}
// where ROLE is currently either REVIEWER or NATIONAL_CORRESPONDENT

const administrator = {role: 'ADMINISTRATOR', labelKey: 'user.roles.administrator'}
const reviewer = {role: 'REVIEWER', labelKey: 'user.roles.reviewer'}
const nationalCorrespondent = {role: 'NATIONAL_CORRESPONDENT', labelKey: 'user.roles.nationalCorrespondent'}
const collaborator = {role: 'COLLABORATOR', labelKey: 'user.roles.collaborator'}
const noRole = {role: 'NONE', labelKey: 'user.roles.noRole'}

const hasRole = (role, roles) => R.find(R.propEq('role', role))(roles)

const getCountryRoles = (countryIso, userInfo) => R.filter(R.propEq('countryIso', countryIso))(userInfo.roles)
const getCountryRole = (countryIso, userInfo) => getCountryRoles(countryIso, userInfo)[0]

const mostPowerfulRole = (countryIso, userInfo) => {
  if (!userInfo) return noRole
  if (hasRole('ADMINISTRATOR', userInfo.roles)) return administrator
  const rolesForCountry = getCountryRoles(countryIso, userInfo)
  //If user has both roles for country, the stronger (Reviewer) "wins"
  if (hasRole('REVIEWER', rolesForCountry)) return reviewer
  if (hasRole('NATIONAL_CORRESPONDENT', rolesForCountry)) return nationalCorrespondent
  if (hasRole('COLLABORATOR', rolesForCountry)) return collaborator
  return noRole //Return null-object for undefined/null-safe access. Shouldn't happen in practice
}

const hasUserRole = (countryIso, userInfo, roleObj) => mostPowerfulRole(countryIso, userInfo).role === roleObj.role

const isReviewer = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, reviewer)
const isNationalCorrespondent = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, nationalCorrespondent)
const hasNoRole = (countryIso, userInfo) => hasUserRole(countryIso, userInfo, noRole)

const isSuperUser = userInfo => hasRole('ADMINISTRATOR', userInfo.roles)

module.exports.getCountryRole = getCountryRole
module.exports.mostPowerfulRole = mostPowerfulRole
module.exports.isReviewer = isReviewer
module.exports.isNationalCorrespondent = isNationalCorrespondent
module.exports.hasNoRole = hasNoRole
module.exports.isSuperUser = isSuperUser
module.exports.reviewer = reviewer
module.exports.nationalCorrespondent = nationalCorrespondent
module.exports.collaborator = collaborator
module.exports.noRole = noRole
