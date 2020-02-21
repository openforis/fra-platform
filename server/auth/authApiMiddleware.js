const { checkCountryAccessFromReqParams, checkAdminAccess } = require('../utils/accessControl')
const { getUser } = require('../utils/requestUtils')
const { allowedToEditDataCheck } = require('../assessment/assessmentEditAccessControl')

const requireCountryEditPermission = async (req, res, next) => {
  const section = req.params.section || req.query.section
  const countryIso = req.params.countryIso || req.query.countryIso
  const user = getUser(req)

  try {
    checkCountryAccessFromReqParams(req)
    await allowedToEditDataCheck(countryIso, user, section)
    next()
  } catch (error) {
    next(error)
  }
}

const requireAdminPermission = async (req, res, next) => {
  const user = getUser(req)
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
