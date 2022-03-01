import { NextFunction, Request, Response } from 'express'
import { Requests } from '@server/utils'
import { Authorizer, Users } from '@meta/user'
import { AccessControlException } from '@server/utils/accessControl'
import { AssessmentController } from '@server/controller'
import { AssessmentName } from '@meta/assessment'
import { CountryIso } from '@meta/area'

// TODO throw as _legacy_server/api/middleware/auth.ts

export const canEdit = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName, section: sectionName } = req.params
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({
    name: assessmentName,
    cycleName,
  })

  const section = await AssessmentController.getSection({
    assessment,
    cycle,
    sectionName,
  })

  const countryStatus = await AssessmentController.getCountryStatus({
    countryIso,
    name: assessmentName as AssessmentName,
    cycleName,
  })

  try {
    if (!Authorizer.canEdit({ user, section, countryIso: countryIso as CountryIso, countryStatus })) {
      throw new Error('err')
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const canView = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName, tableName } = req.params
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({
    name: assessmentName,
    cycleName,
  })

  const table = await AssessmentController.getTable({
    assessment,
    cycle,
    tableName,
  })

  try {
    if (!Authorizer.canView({ user, table, countryIso: countryIso as CountryIso, cycle, assessment })) {
      throw new Error('err')
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const isAdmin = async (req: any, _res: any, next: any) => {
  const user = Requests.getRequestUser(req)
  try {
    if (!Users.isAdministrator(user)) {
      // @ts-ignore
      throw new AccessControlException('error.access.userNotAdministrator', { user: user.name })
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const AuthorizationMiddleware = {
  canEdit,
  canView,
  isAdmin,
}
