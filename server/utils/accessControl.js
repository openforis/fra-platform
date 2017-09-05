const R = require('ramda')
const {mostPowerfulRole, isReviewer} = require('../../common/countryRole')

function AccessControlException (key, values) {
  this.error = {key, values}
  Error.captureStackTrace(this, AccessControlException)
}

AccessControlException.prototype = Object.create(Error.prototype)
AccessControlException.prototype.name = 'AccessControlException'
AccessControlException.prototype.constructor = AccessControlException

// Checks whether user should have access to the specified country
// Throws a custom Error user has no access (handled in sendErr)
const checkCountryAccess = (countryIso, user) => {
  const role = mostPowerfulRole(countryIso, user)
  if (role.role === 'NONE') {
    throw new AccessControlException('error.access.countryRoleNotSpecified', {user: user.name, countryIso})
  }
}

// Checks whether user is reviewer of the specified country
// Throws a custom Error user has no access (handled in sendErr)
const checkReviewerCountryAccess = (countryIso, user) => {
  if (!isReviewer(countryIso, user)) {
    throw new AccessControlException('error.access.countryUserNotReviewer', {user: user.name, countryIso})
  }
}

// Digs the countryIso from path or request params and checks access
// WARNING: the param name needs to be exactly 'countryIso'
// If it's not, use checkCountryAccess instead
const checkCountryAccessFromReqParams = (req) => {
  if (req.params.countryIso) checkCountryAccess(req.params.countryIso, req.user)
  if (req.query.countryIso) checkCountryAccess(req.query.countryIso, req.user)
}

const checkParamAllowedValue = (req, paramName, values) => {
  if(R.isNil(req.params[paramName]))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  if(!R.contains(req.params[paramName], values))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  return req.params[paramName]
}

const checkParamValue = (req, paramName, allowFn) => {
  if(R.isNil(req.params[paramName]))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  if(!allowFn(req.params[paramName]))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  return req.params[paramName]
}

module.exports.checkCountryAccess = checkCountryAccess
module.exports.checkReviewerCountryAccess = checkReviewerCountryAccess
module.exports.checkCountryAccessFromReqParams = checkCountryAccessFromReqParams
module.exports.AccessControlException = AccessControlException
module.exports.checkParamHasAllowedValues = checkParamAllowedValue
module.exports.checkParamValueIsAllowed = checkParamValue
