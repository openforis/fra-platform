import { NextFunction, Request, Response } from 'express'

import { CycleDataParams, CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { MessageTopicStatus } from 'meta/messageCenter'
import { Authorizer, CollaboratorEditPropertyType, Users } from 'meta/user'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { MessageCenterController } from 'server/controller/messageCenter'
import { MetadataController } from 'server/controller/metadata'
import { tryCatch } from 'server/middleware/tryCatch'
import { Requests } from 'server/utils'

const _next = (allowed: boolean, next: NextFunction): void => {
  if (allowed) return next()
  return next(new Error(`userNotAuthorized`))
}
const requireEditCountryProps = async (req: Request, _res: Response, next: NextFunction) => {
  const { assessmentName, countryIso, cycleName } = { ...req.params, ...req.query, ...req.body } as CycleParams
  const user = Requests.getUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const country = await AreaController.getCountry({ countryIso, assessment, cycle })

  _next(Authorizer.canEditCountryProps({ country, cycle, user }), next)
}

const requireEditData = async (req: Request, next: NextFunction) => {
  const { assessmentName, countryIso, cycleName, permission, sectionName } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleDataParams & { permission?: CollaboratorEditPropertyType }
  const user = Requests.getUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const country = await AreaController.getCountry({ countryIso, assessment, cycle })
  const section = await MetadataController.getSubSection({ assessment, cycle, sectionName })

  _next(Authorizer.canEditData({ country, cycle, permission, section, user }), next)
}

const requireEditDescriptions = async (req: Request, _res: Response, next: NextFunction) => {
  const _req = req
  _req.body.permission = CollaboratorEditPropertyType.descriptions
  return requireEditData(_req, next)
}

const requireEditTableData = async (req: Request, _res: Response, next: NextFunction) => {
  const _req = req
  _req.body.permission = CollaboratorEditPropertyType.tableData
  return requireEditData(_req, next)
}

const requireView = async (req: Request, _res: Response, next: NextFunction) => {
  const { countryIso, assessmentName, cycleName } = { ...req.params, ...req.query } as CycleParams
  if (!countryIso || !assessmentName || !cycleName) {
    next(new Error(`missingParam ${JSON.stringify({ countryIso, assessmentName, cycleName })}`))
  }
  const user = Requests.getUser(req)

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next(Authorizer.canView({ assessment, user, countryIso, cycle }), next)
}

const requireAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  const user = Requests.getUser(req)
  _next(Users.isAdministrator(user), next)
}

const requireEditMessageTopic = async (req: Request, _res: Response, next: NextFunction) => {
  type Params = CycleParams & { key: string }
  const { countryIso, assessmentName, cycleName, key } = { ...req.params, ...req.query, ...req.body } as Params
  const user = Requests.getUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const topic = await MessageCenterController.getTopic({ countryIso, assessment, cycle, key, user })

  if (topic) {
    _next(
      topic.status === MessageTopicStatus.opened ||
        (topic.status === MessageTopicStatus.resolved && Users.hasEditorRole({ user, countryIso, cycle })),
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
  const user = Requests.getUser(req)

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
  const { assessmentName, countryIso, cycleName } = { ...req.params, ...req.query, ...req.body } as CycleParams
  const user = Requests.getUser(req)
  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next(Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle), next)
}

const requireEditUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { id } = { ...req.params, ...req.query, ...req.body } as { id: string }
  const user = Requests.getUser(req)
  const isAdministrator = Users.isAdministrator(user)
  const isSelf = String(user?.id) === String(id)

  _next(isAdministrator || isSelf, next)
}

const requireInviteUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { assessmentName, countryIso, cycleName } = { ...req.params, ...req.query, ...req.body } as CycleParams
  const user = Requests.getUser(req)
  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next(Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0, next)
}

const requireViewUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { id, assessmentName, countryIso, cycleName } = { ...req.params, ...req.query, ...req.body } as CycleParams & {
    id: string
  }
  const user = Requests.getUser(req)
  const isAdministrator = Users.isAdministrator(user)
  const isSelf = String(user?.id) === String(id)

  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next(isAdministrator || isSelf || Users.getRolesAllowedToView({ user, countryIso, cycle }).length > 0, next)
}

const requireViewUsers = async (req: Request, _res: Response, next: NextFunction) => {
  const { assessmentName, countryIso, cycleName, print } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleParams & { print?: string }
  const user = Requests.getUser(req)
  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next((print === 'true' && cycle.published) || Authorizer.canViewUsers({ user, countryIso, cycle }), next)
}

const requireEditRepositoryItem = async (req: Request, _res: Response, next: NextFunction) => {
  const { assessmentName, countryIso, cycleName } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleParams
  const user = Requests.getUser(req)

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const country = await AreaController.getCountry({ countryIso, assessment, cycle })

  _next(Authorizer.canEditRepositoryItem({ country, cycle, user }), next)
}

const requireUser = async (req: Request, _res: Response, next: NextFunction) => {
  const user = Requests.getUser(req)

  _next(Boolean(user), next)
}

const requireViewRepositoryFile = async (req: Request, _res: Response, next: NextFunction) => {
  const { assessmentName, cycleName, countryIso, uuid } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleParams & { uuid: string }

  const { cycle, assessment } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const repositoryItem = await CycleDataController.Repository.getOne({ assessment, cycle, uuid })
  const user = Requests.getUser(req)

  _next(Authorizer.canViewRepositoryItem({ assessment, cycle, countryIso, user, repositoryItem }), next)
}

export const AuthMiddleware = {
  requireAdmin: tryCatch(requireAdmin),
  requireDeleteTopicMessage: tryCatch(requireDeleteTopicMessage),
  requireEditRepositoryItem: tryCatch(requireEditRepositoryItem),
  requireEditCountryProps: tryCatch(requireEditCountryProps),
  requireEditDescriptions: tryCatch(requireEditDescriptions),
  requireEditMessageTopic: tryCatch(requireEditMessageTopic),
  requireEditTableData: tryCatch(requireEditTableData),
  requireEditUser: tryCatch(requireEditUser),
  requireInviteUser: tryCatch(requireInviteUser),
  requireResolveTopic: tryCatch(requireResolveTopic),
  requireUser: tryCatch(requireUser),
  requireView: tryCatch(requireView),
  requireViewRepositoryFile: tryCatch(requireViewRepositoryFile),
  requireViewUser: tryCatch(requireViewUser),
  requireViewUsers: tryCatch(requireViewUsers),
}
