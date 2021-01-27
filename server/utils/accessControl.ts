// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'roleForCou... Remove this comment to see the full error message
const { roleForCountry, isReviewer, isAdministrator } = require('../../common/countryRole')

function AccessControlException(key: any, values: any) {
  this.error = { key, values }
  Error.captureStackTrace(this, AccessControlException)
}

AccessControlException.prototype = Object.create(Error.prototype)
AccessControlException.prototype.name = 'AccessControlException'
AccessControlException.prototype.constructor = AccessControlException

// Checks whether user should have access to the specified country
// Throws a custom Error user has no access (handled in sendErr)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkCount... Remove this comment to see the full error message
const checkCountryAccess = (countryIso: any, user: any) => {
  const role = roleForCountry(countryIso, user)
  if (role.role === 'NONE') {
    throw new AccessControlException('error.access.countryRoleNotSpecified', { user: user.name, countryIso })
  }
}

// Checks whether user is reviewer of the specified country
// Throws a custom Error user has no access (handled in sendErr)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkRevie... Remove this comment to see the full error message
const checkReviewerCountryAccess = (countryIso: any, user: any) => {
  if (!isReviewer(countryIso, user)) {
    throw new AccessControlException('error.access.countryUserNotReviewer', { user: user.name, countryIso })
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkAdmin... Remove this comment to see the full error message
const checkAdminAccess = (user: any) => {
  if (!isAdministrator(user)) {
    throw new AccessControlException('error.access.userNotAdministrator', { user: user.name })
  }
}

// Digs the countryIso from path or request params and checks access
// WARNING: the param name needs to be exactly 'countryIso'
// If it's not, use checkCountryAccess instead
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkCount... Remove this comment to see the full error message
const checkCountryAccessFromReqParams = (req: any) => {
  if (req.user) {
    if (req.params.countryIso) checkCountryAccess(req.params.countryIso, req.user)
    if (req.query.countryIso) checkCountryAccess(req.query.countryIso, req.user)
  } else {
    throw new AccessControlException('error.access.userNotSpecified')
  }
}

module.exports.checkCountryAccess = checkCountryAccess
module.exports.checkReviewerCountryAccess = checkReviewerCountryAccess
module.exports.checkAdminAccess = checkAdminAccess
module.exports.checkCountryAccessFromReqParams = checkCountryAccessFromReqParams
module.exports.AccessControlException = AccessControlException
