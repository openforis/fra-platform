import { NextFunction, Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { MessageTopicStatus } from '@meta/messageCenter'
import { Authorizer, Users } from '@meta/user'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
import { Requests } from '@server/utils'
import { CycleParams } from '@server/utils/request'

const _next = (allowed: boolean, next: NextFunction): void => {
  if (allowed) return next()
  return next(new Error(`userNotAuthorized`))
}

const requireEdit = async (req: Request, _res: Response, next: NextFunction) => {
  const {
    countryIso,
    assessmentName,
    cycleName,
    section: sectionName,
  } = <Record<string, string>>{ ...req.params, ...req.query, ...req.body }
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const section = await AssessmentController.getSection({ assessment, cycle, sectionName })
  const country = await AreaController.getCountry({ countryIso: countryIso as CountryIso, assessment, cycle })

  _next(Authorizer.canEdit({ user, section, countryIso: countryIso as CountryIso, country }), next)
}

const requireView = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName } = { ...req.params, ...req.query } as CycleParams
  if (!countryIso || !assessmentName || !cycleName) {
    next(new Error(`missingParam ${JSON.stringify({ countryIso, assessmentName, cycleName })}`))
  }
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next(Authorizer.canView({ user, countryIso, cycle, assessment }), next)
}

const requireAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  const user = Requests.getRequestUser(req)
  _next(Users.isAdministrator(user), next)
}

const requireEditMessageTopic = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName, key } = <Record<string, string>>{
    ...req.params,
    ...req.query,
    ...req.body,
  }
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const topic = await MessageCenterController.getTopic({
    countryIso: countryIso as CountryIso,
    assessment,
    cycle,
    key,
    user,
  })

  if (topic) {
    _next(
      topic.status === MessageTopicStatus.opened ||
        (topic.status === MessageTopicStatus.resolved &&
          (Users.isAdministrator(user) || Users.isReviewer(user, countryIso as CountryIso))),
      next
    )
  } else {
    _next(!!user, next)
  }
}

const requireDeleteTopicMessage = async (req: Request, _res: Response, next: NextFunction) => {
  const {
    countryIso,
    assessmentName,
    cycleName,
    topicKey: key,
    id,
  } = <Record<string, string>>{
    ...req.params,
    ...req.query,
    ...req.body,
  }
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  const topic = await MessageCenterController.getTopic({
    countryIso: countryIso as CountryIso,
    assessment,
    cycle,
    key,
    user,
    includeMessages: true,
  })

  if (topic && topic.messages.length > 0) {
    const message = topic.messages.filter((message) => message.id === Number(id))
    _next(!!message, next)
  } else {
    next(new Error(`messageNotFound`))
  }
}

const requireResolveTopic = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso } = <Record<string, string>>{ ...req.params, ...req.query }
  const user = Requests.getRequestUser(req)
  _next(Users.isAdministrator(user) || Users.isReviewer(user, countryIso as CountryIso), next)
}

const requireEditUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso } = <Record<string, string>>{ ...req.params, ...req.query, ...req.body }
  const user = Requests.getRequestUser(req)
  _next(Users.getRolesAllowedToEdit({ user, countryIso: countryIso as CountryIso }).length > 0, next)
}

const requireViewUsers = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName } = <Record<string, string>>{
    ...req.params,
    ...req.query,
  }
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next(Authorizer.canViewUsers({ user, countryIso: countryIso as CountryIso, cycle, assessment }), next)
}

export const AuthMiddleware = {
  requireEdit,
  requireView,
  requireAdmin,
  requireDeleteTopicMessage,
  requireResolveTopic,
  requireEditMessageTopic,
  requireEditUser,
  requireViewUsers,
}
