import * as Request from '../../utils/requestUtils'
import { checkCountryAccessFromReqParams, checkAdminAccess } from '../../utils/accessControl'
import { allowedToEditDataCheck } from '../../assessment/assessmentEditAccessControl'

export const requireCountryEditPermission = async (req: any, res: any, next: any) => {
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

export const requireAdminPermission = async (req: any, res: any, next: any) => {
  const user = (Request as any).getUser(req)
  try {
    checkAdminAccess(user)
    next()
  } catch (error) {
    next(error)
  }
}
export const ApiAuthMiddleware = {
  requireCountryEditPermission,
  requireAdminPermission,
}
