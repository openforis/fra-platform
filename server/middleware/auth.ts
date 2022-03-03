import { NextFunction, Request, Response } from 'express'

import { Authorizer, Users } from '@meta/user'
import { AssessmentName } from '@meta/assessment'
import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller'
import { Requests } from '@server/utils'

const _next = (allowed: boolean, next: NextFunction): void => {
  if (allowed) next()
  next(new Error(`userNotAuthorized`))
}

export const requireEdit = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName, section: sectionName } = req.params
  const name = <AssessmentName>assessmentName
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name, cycleName })
  const section = await AssessmentController.getSection({ assessment, cycle, sectionName })
  const countryStatus = await AssessmentController.getCountryStatus({ countryIso, name, cycleName })

  _next(Authorizer.canEdit({ user, section, countryIso: countryIso as CountryIso, countryStatus }), next)
}

export const requireView = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName, tableName } = req.params
  const name = <AssessmentName>assessmentName
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name, cycleName })
  const table = await AssessmentController.getTable({ assessment, cycle, tableName })

  _next(Authorizer.canView({ user, table, countryIso: countryIso as CountryIso, cycle, assessment }), next)
}

const requireAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  const user = Requests.getRequestUser(req)
  _next(Users.isAdministrator(user), next)
}

export const AuthMiddleware = {
  requireEdit,
  requireView,
  requireAdmin,
}
