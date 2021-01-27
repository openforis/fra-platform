// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Request'.
const Request = require('../utils/requestUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkCount... Remove this comment to see the full error message
const { checkCountryAccessFromReqParams, checkAdminAccess } = require('../utils/accessControl')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'allowedToE... Remove this comment to see the full error message
const { allowedToEditDataCheck } = require('../assessment/assessmentEditAccessControl')

const requireCountryEditPermission = async (req: any, res: any, next: any) => {
  const { countryIso, section } = (Request as any).getParams(req)
  const user = (Request as any).getUser(req)
  try {
    checkCountryAccessFromReqParams(req)
    // Section is returned as string, check if it's not 'undefined'
    const validSection = section && section !== 'undefined'
    if (validSection && !(Request as any).isGet(req)) {
      await allowedToEditDataCheck(countryIso, user, section)
    }
    next()
  } catch (error) {
    next(error)
  }
}
const requireAdminPermission = async (req: any, res: any, next: any) => {
  const user = (Request as any).getUser(req)
  try {
    checkAdminAccess(user)
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = {
  requireCountryEditPermission,
  requireAdminPermission,
}
