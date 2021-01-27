// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assert')
// The returned value is of the form:
// {role: <ROLE>, label: <LABEL>}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'administra... Remove this comment to see the full error message
const administrator = {
  role: 'ADMINISTRATOR',
  labelKey: 'user.roles.administrator',
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'reviewer'.
const reviewer = { role: 'REVIEWER', labelKey: 'user.roles.reviewer' }
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'nationalCo... Remove this comment to see the full error message
const nationalCorrespondent = {
  role: 'NATIONAL_CORRESPONDENT',
  labelKey: 'user.roles.nationalCorrespondent',
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'alternateN... Remove this comment to see the full error message
const alternateNationalCorrespondent = {
  role: 'ALTERNATE_NATIONAL_CORRESPONDENT',
  labelKey: 'user.roles.alternateNationalCorrespondent',
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'collaborat... Remove this comment to see the full error message
const collaborator = {
  role: 'COLLABORATOR',
  labelKey: 'user.roles.collaborator',
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'noRole'.
const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'roles'.
const roles = {
  [administrator.role]: administrator,
  [reviewer.role]: reviewer,
  [nationalCorrespondent.role]: nationalCorrespondent,
  [alternateNationalCorrespondent.role]: alternateNationalCorrespondent,
  [collaborator.role]: collaborator,
}

const roleKeys = R.pipe(R.values, R.map(R.prop('role')))(roles)

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getRoleLab... Remove this comment to see the full error message
const getRoleLabelKey = (roleName: any) => R.path([roleName, 'labelKey'], roles)

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rolesToCheck' implicitly has an 'any[]'... Remove this comment to see the full error message
const hasRole = (role: any, rolesToCheck = []) => R.find(R.propEq('role', role))(rolesToCheck)

const getCountryRoles = (countryIso: any, userInfo: any) => R.filter(R.propEq('countryIso', countryIso))(userInfo.roles)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const getCountryRole = (countryIso: any, userInfo: any) => getCountryRoles(countryIso, userInfo)[0]

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'roleForCou... Remove this comment to see the full error message
const roleForCountry = (countryIso: any, userInfo: any) => {
  if (!userInfo) return noRole
  if (hasRole('ADMINISTRATOR', userInfo.roles)) return administrator
  const rolesForCountry = getCountryRoles(countryIso, userInfo)
  assert(rolesForCountry.length < 2, `Ambiguous roles found for user ${userInfo} and country ${countryIso}`)
  if (rolesForCountry.length === 0) return noRole
  const roleObj = roles[rolesForCountry[0].role]
  if (!roleObj) return noRole
  return roleObj
}

const getRoleForCountryLabelKey = R.pipe(roleForCountry, R.prop('labelKey'))

const hasUserRole = (countryIso: any, userInfo: any, roleObj: any) =>
  roleForCountry(countryIso, userInfo).role === roleObj.role

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isReviewer... Remove this comment to see the full error message
const isReviewer = (countryIso: any, userInfo: any) =>
  hasUserRole(countryIso, userInfo, reviewer) || hasUserRole(countryIso, userInfo, administrator)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isNational... Remove this comment to see the full error message
const isNationalCorrespondent = (countryIso: any, userInfo: any) =>
  hasUserRole(countryIso, userInfo, nationalCorrespondent)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isAlternat... Remove this comment to see the full error message
const isAlternateNationalCorrespondent = (countryIso: any, userInfo: any) =>
  hasUserRole(countryIso, userInfo, alternateNationalCorrespondent)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isCollabor... Remove this comment to see the full error message
const isCollaborator = (countryIso: any, userInfo: any) => hasUserRole(countryIso, userInfo, collaborator)
const hasNoRole = (countryIso: any, userInfo: any) => hasUserRole(countryIso, userInfo, noRole)

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isAdminist... Remove this comment to see the full error message
const isAdministrator = (userInfo: any) => userInfo && hasRole('ADMINISTRATOR', userInfo.roles)

module.exports.getCountryRole = getCountryRole
module.exports.roleForCountry = roleForCountry
module.exports.getRoleForCountryLabelKey = getRoleForCountryLabelKey

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
