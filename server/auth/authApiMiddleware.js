const Request = require('../utils/requestUtils')

const { checkCountryAccessFromReqParams, checkAdminAccess } = require('../utils/accessControl')
const { allowedToEditDataCheck } = require('../assessment/assessmentEditAccessControl')

const requireCountryEditPermission = async (req, res, next) => {
  const { countryIso, section } = Request.getParams(req)
  const user = Request.getUser(req)

  try {
    checkCountryAccessFromReqParams(req)
    if (section) {
      await allowedToEditDataCheck(countryIso, user, section)
    }
    next()
  } catch (error) {
    next(error)
  }
}

const requireAdminPermission = async (req, res, next) => {
  const user = Request.getUser(req)
  try {
    checkAdminAccess(user)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requireCountryEditPermission,
  requireAdminPermission
}
