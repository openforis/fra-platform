const { mostPowerfulRole } = require('../../common/countryRole')

function AccessControlException(message) {
  this.message = message
  Error.captureStackTrace(this, AccessControlException)
}

AccessControlException.prototype = Object.create(Error.prototype);
AccessControlException.prototype.name = "AccessControlException";
AccessControlException.prototype.constructor = AccessControlException;

const checkCountryAccess = (countryIso, req) => {
  const user = req.session.passport.user
  const role = mostPowerfulRole(countryIso, user)
  if (role.role === 'NONE') {
    const errMsg = `User ${user.name} tried to access ${countryIso} but no role has been specified`
    throw new AccessControlException(errMsg)
  }
}

// Checks whether user should have access to the specified country
// Throws a custom Error user has no access (handled in sendErr)
module.exports.checkCountryAccess = checkCountryAccess
module.exports.AccessControlException = AccessControlException
