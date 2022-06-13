import { NextFunction, Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { MessageTopicStatus } from '@meta/messageCenter'
import { Authorizer, Users } from '@meta/user'

import { AssessmentController } from '@server/controller/assessment'
import { MessageCenterController } from '@server/controller/messageCenter'
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
  } = <Record<string, string>>{ ...req.params, ...req.query, ...req.body }
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
  const { countryIso, assessmentName, cycleName, key } = <Record<string, string>>{
    ...req.params,
    ...req.query,
    ...req.body,
  }
  const user = Requests.getRequestUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({
    name: assessmentName as AssessmentName,
    cycleName,
  })
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

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({
    name: assessmentName as AssessmentName,
    cycleName,
  })

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

const requireInviteUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso } = <Record<string, string>>{ ...req.params, ...req.query }
  const user = Requests.getRequestUser(req)
  _next(Users.getRolesAllowedToEdit({ user, countryIso: countryIso as CountryIso }).length > 0, next)
}

export const AuthMiddleware = {
  requireEdit,
  requireView,
  requireAdmin,
  requireDeleteTopicMessage,
  requireResolveTopic,
  requireEditMessageTopic,
  requireInviteUser,
}
