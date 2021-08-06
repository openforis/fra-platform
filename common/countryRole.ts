import * as R from 'ramda'
// import * as assert from 'assert'
// The returned value is of the form:
// {role: <ROLE>, label: <LABEL>}

export const administrator = {
  role: 'ADMINISTRATOR',
  labelKey: 'user.roles.administrator',
}
export const reviewer = { role: 'REVIEWER', labelKey: 'user.roles.reviewer' }
export const nationalCorrespondent = {
  role: 'NATIONAL_CORRESPONDENT',
  labelKey: 'user.roles.nationalCorrespondent',
}
export const alternateNationalCorrespondent = {
  role: 'ALTERNATE_NATIONAL_CORRESPONDENT',
  labelKey: 'user.roles.alternateNationalCorrespondent',
}
export const collaborator = {
  role: 'COLLABORATOR',
  labelKey: 'user.roles.collaborator',
}
export const noRole = { role: 'NONE', labelKey: 'user.roles.noRole' }

export const roles = {
  [administrator.role]: administrator,
  [reviewer.role]: reviewer,
  [nationalCorrespondent.role]: nationalCorrespondent,
  [alternateNationalCorrespondent.role]: alternateNationalCorrespondent,
  [collaborator.role]: collaborator,
}

export const roleKeys = R.pipe(R.values, R.map(R.prop('role')))(roles)

export const getRoleLabelKey = (roleName: any): string => R.path([roleName, 'labelKey'], roles)
// @ts-ignore
export const hasRole = (role: any, rolesToCheck = []) => R.find(R.propEq('role', role))(rolesToCheck)

export const getCountryRoles = (countryIso: any, userInfo: any) =>
  R.filter(R.propEq('countryIso', countryIso))(userInfo.roles)
// @ts-ignore
export const getCountryRole = (countryIso: any, userInfo: any) => getCountryRoles(countryIso, userInfo)[0]

/**
 * @deprecated.
 * uses Users.getCountryRole
 */
export const roleForCountry = (countryIso: any, userInfo: any) => {
  if (!userInfo) return noRole
  if (hasRole('ADMINISTRATOR', userInfo.roles)) return administrator
  const rolesForCountry: any = getCountryRoles(countryIso, userInfo)
  // assert(rolesForCountry.length < 2, `Ambiguous roles found for user ${userInfo} and country ${countryIso}`)
  if (rolesForCountry.length === 0) return noRole

  const roleObj = roles[rolesForCountry[0].role]
  if (!roleObj) return noRole
  return roleObj
}

export const getRoleForCountryLabelKey = R.pipe(roleForCountry, R.prop('labelKey'))

/**
 * @deprecated.
 * uses Users.hasCountryRole
 */
export const hasUserRole = (countryIso: any, userInfo: any, roleObj: any) =>
  roleForCountry(countryIso, userInfo).role === roleObj.role

/**
 * @deprecated.
 * uses Users.isReviewer
 */
export const isReviewer = (countryIso: any, userInfo: any) =>
  hasUserRole(countryIso, userInfo, reviewer) || hasUserRole(countryIso, userInfo, administrator)
/**
 * @deprecated.
 * uses Users.isNationalCorrespondent
 */
export const isNationalCorrespondent = (countryIso: any, userInfo: any) =>
  hasUserRole(countryIso, userInfo, nationalCorrespondent)
/**
 * @deprecated.
 * uses Users.isAlternateNationalCorrespondent
 */
export const isAlternateNationalCorrespondent = (countryIso: any, userInfo: any) =>
  hasUserRole(countryIso, userInfo, alternateNationalCorrespondent)
/**
 * @deprecated.
 * uses Users.isCollaborator
 */
export const isCollaborator = (countryIso: any, userInfo: any) => hasUserRole(countryIso, userInfo, collaborator)
/**
 * @deprecated.
 * uses Users.hasNoRole
 */
export const hasNoRole = (countryIso: any, userInfo: any) => hasUserRole(countryIso, userInfo, noRole)
/**
 * @deprecated.
 * uses Users.isAdministrator
 */
export const isAdministrator = (userInfo: any) => userInfo && hasRole('ADMINISTRATOR', userInfo.roles)

export const roles2 = R.values(roles)
