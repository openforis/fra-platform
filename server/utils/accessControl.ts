import { roleForCountry, isReviewer, isAdministrator } from '@common/countryRole'

export function AccessControlException(key: any, values: any) {
  this.error = { key, values }
  Error.captureStackTrace(this, AccessControlException)
}

AccessControlException.prototype = Object.create(Error.prototype)
AccessControlException.prototype.name = 'AccessControlException'
AccessControlException.prototype.constructor = AccessControlException

// Checks whether user should have access to the specified country
// Throws a custom Error user has no access (handled in sendErr)
export const checkCountryAccess = (countryIso: any, user: any) => {
  const role = roleForCountry(countryIso, user)
  if (role.role === 'NONE') {
    // @ts-ignore
    throw new AccessControlException('error.access.countryRoleNotSpecified', { user: user.name, countryIso })
  }
}

// Checks whether user is reviewer of the specified country
// Throws a custom Error user has no access (handled in sendErr)
export const checkReviewerCountryAccess = (countryIso: any, user: any) => {
  if (!isReviewer(countryIso, user)) {
    // @ts-ignore
    throw new AccessControlException('error.access.countryUserNotReviewer', { user: user.name, countryIso })
  }
}

export const checkAdminAccess = (user: any) => {
  if (!isAdministrator(user)) {
    // @ts-ignore
    throw new AccessControlException('error.access.userNotAdministrator', { user: user.name })
  }
}

// Digs the countryIso from path or request params and checks access
// WARNING: the param name needs to be exactly 'countryIso'
// If it's not, use checkCountryAccess instead
export const checkCountryAccessFromReqParams = (req: any) => {
  if (req.user) {
    if (req.params.countryIso) checkCountryAccess(req.params.countryIso, req.user)
    if (req.query.countryIso) checkCountryAccess(req.query.countryIso, req.user)
  } else {
    // @ts-ignore
    throw new AccessControlException('error.access.userNotSpecified')
  }
}
