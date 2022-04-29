import { NextFunction, Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { MessageTopicType } from '@meta/messageCenter'
import { Authorizer, Users } from '@meta/user'

import { AssessmentController } from '@server/controller/assessment'
import { Requests } from '@server/utils'

const _next = (allowed: boolean, next: NextFunction): void => {
  if (allowed) return next()
  return next(new Error(`userNotAuthorized`))
}

export const requireEdit = async (req: Request, _res: Response, next: NextFunction) => {
  const {
    countryIso,
    assessmentName,
    cycleName,
    section: sectionName,
  } = <Record<string, string>>{ ...req.params, ...req.query }
  const name = <AssessmentName>assessmentName
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name, cycleName })
  const section = await AssessmentController.getSection({ assessment, cycle, sectionName })
  const country = await AssessmentController.getCountry({ countryIso: countryIso as CountryIso, assessment, cycle })

  _next(Authorizer.canEdit({ user, section, countryIso: countryIso as CountryIso, country }), next)
}

export const requireView = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName } = <Record<string, string>>{ ...req.params, ...req.query }
  if (!countryIso || !assessmentName || !cycleName) {
    next(new Error(`missingParam ${JSON.stringify({ countryIso, assessmentName, cycleName })}`))
  }

  const name = <AssessmentName>assessmentName
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ name, cycleName })

  _next(Authorizer.canView({ user, countryIso: countryIso as CountryIso, cycle, assessment }), next)
}

const requireAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  const user = Requests.getRequestUser(req)
  _next(Users.isAdministrator(user), next)
}

const requireEditMessageTopic = async (req: Request, _res: Response, next: NextFunction) => {
  const { type } = req.query as Record<string, string>
  if (type === MessageTopicType.review) {
    await requireEdit(req, _res, next)
  } else {
    next()
  }
}

const requireResolveTopic = async (req: Request, _res: Response, next: NextFunction) => {
  const user = Requests.getRequestUser(req)
  const { countryIso } = <Record<string, string>>{ ...req.params, ...req.query }
  _next(Users.isAdministrator(user) || Users.isReviewer(user, countryIso as CountryIso), next)
}

export const AuthMiddleware = {
  requireEdit,
  requireView,
  requireAdmin,
  requireResolveTopic,
  requireEditMessageTopic,
}
