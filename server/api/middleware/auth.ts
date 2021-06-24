import { Requests } from '@server/utils'
import { checkCountryAccessFromReqParams, checkAdminAccess } from '../../utils/accessControl'
import { allowedToEditDataCheck } from '../../assessment/assessmentEditAccessControl'

export const requireCountryEditPermission = async (req: any, _res: any, next: any) => {
  const { countryIso, section } = Requests.getParams(req)
  const user = Requests.getUser(req)
  try {
    checkCountryAccessFromReqParams(req)
    // Section is returned as string, check if it's not 'undefined'
    const validSection = section && section !== 'undefined'
    if (validSection && !Requests.isGet(req)) {
      await allowedToEditDataCheck(countryIso, user, section)
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const requireAdminPermission = async (req: any, _res: any, next: any) => {
  const user = Requests.getUser(req)
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
