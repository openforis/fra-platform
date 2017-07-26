const R = require('ramda')

// Returns the most powerful role that the user has
// for a certain country (REVIEWER > NATIONAL_CORRESPONDENT)
// The returned value is of the form:
// {role: <ROLE>, label: <LABEL>}
// where ROLE is currently either REVIEWER or NATIONAL_CORRESPONDENT
// <ROLE>_ALL roles are changed to their corresponding "normal" roles, e.g.
// REVIEWER_ALL will be REVIEWER for the country we are interested in

const reviewer = {role: 'REVIEWER', label: 'Reviewer'}
const nationalCorrespondent = {role: 'NATIONAL_CORRESPONDENT', label: 'National Correspondent'}
const noRole = {role: 'NONE', label: 'N/A'}

const mostPowerfulRole = (countryIso, userInfo) => {
  if (!userInfo) return noRole
  const hasRole = (role, roles) => R.find(R.propEq('role', role))(roles)
  if (hasRole('REVIEWER_ALL', userInfo.roles)) return reviewer
  const rolesForCountry = R.filter(R.propEq('countryIso', countryIso))(userInfo.roles)
  //If user has both roles for country, the stronger (Reviewer) "wins"
  if (hasRole('REVIEWER', rolesForCountry)) return reviewer
  if (hasRole('NATIONAL_CORRESPONDENT_ALL', userInfo.roles)) return nationalCorrespondent
  if (hasRole('NATIONAL_CORRESPONDENT', rolesForCountry)) return nationalCorrespondent
  return noRole //Return null-object for undefined/null-safe access. Shouldn't happen in practice
}

const isReviewer = (countryIso, userInfo) => mostPowerfulRole(countryIso, userInfo).role === reviewer.role

module.exports.mostPowerfulRole = mostPowerfulRole
module.exports.isReviewer = isReviewer
module.exports.reviewer = reviewer
module.exports.nationalCorrespondent = nationalCorrespondent
module.exports.noRole = noRole
