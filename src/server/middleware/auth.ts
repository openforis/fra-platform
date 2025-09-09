import { NextFunction, Request, Response } from 'express'

import { CycleDataParams, CycleParams } from 'meta/api/request'
import { UserEditRequest } from 'meta/api/request/user/edit'
import { AreaCode, Country, CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { MessageTopicStatus } from 'meta/messageCenter'
import { Authorizer, CollaboratorEditPropertyType, User, Users } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { MessageCenterController } from 'server/controller/messageCenter'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'
import { tryCatch } from 'server/middleware/tryCatch'
import { Requests } from 'server/utils'

const _next = (allowed: boolean, next: NextFunction): void => {
  if (allowed) return next()
  return next(new Error(`userNotAuthorized`))
}

// TODO (future task): refactor auth with subfiles and use _getAuthCycleProps where needed
type AuthCycleProps = { assessment: Assessment; cycle: Cycle; country?: Country; countryIso: AreaCode; user: User }

const _getAuthCycleProps = async (req: Request, next: NextFunction): Promise<AuthCycleProps> => {
  const params = { ...req.params, ...req.query, ...req.body } as CycleParams & { authContext?: string }
  const { authContext, countryIso } = params
  const { assessmentName, cycleName } = authContext ? JSON.parse(decodeURIComponent(authContext)) : params

  if (!countryIso || !assessmentName || !cycleName) {
    next(new Error(`missingParam ${JSON.stringify({ countryIso, assessmentName, cycleName })}`))
  }

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const { country } = req.context
  const user = Requests.getUser(req)

  return { assessment, cycle, country, countryIso, user }
}

const requireEditCountryProps = async (req: Request, _res: Response, next: NextFunction) => {
  const { assessmentName, cycleName } = { ...req.params, ...req.query, ...req.body } as CycleParams
  const user = Requests.getUser(req)

  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const { country } = req.context

  _next(Authorizer.canEditCountryProps({ country, cycle, user }), next)
}

const requireEditData = async (req: Request, next: NextFunction) => {
  const { assessmentName, cycleName, permission, sectionName } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleDataParams & { permission?: CollaboratorEditPropertyType }
  const user = Requests.getUser(req)

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const { country } = req.context
  const section = await MetadataController.getSubSection({ assessment, cycle, sectionName })

  _next(Authorizer.canEditSectionData({ country, cycle, permission, section, user }), next)
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
  const { assessment, country, countryIso, cycle, user } = await _getAuthCycleProps(req, next)

  _next(Authorizer.canView({ assessment, country, areaCode: countryIso, cycle, user }), next)
}

const requireAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  const user = Requests.getUser(req)
  _next(Users.isAdministrator(user), next)
}

const requireEditMessageTopic = async (req: Request, _res: Response, next: NextFunction) => {
  type Params = CycleParams & { key: string }
  const { assessmentName, countryIso, cycleName, key } = { ...req.params, ...req.query, ...req.body } as Params
  const user = Requests.getUser(req)

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
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
    assessmentName,
    countryIso,
    cycleName,
    id,
    topicKey: key,
  } = <Record<string, string>>{
    ...req.params,
    ...req.query,
    ...req.body,
  }
  const user = Requests.getUser(req)

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

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

const requireEditUser = async (req: UserEditRequest, _res: Response, next: NextFunction) => {
  const { assessmentName, countryIso, cycleName } = req.query
  const user = Requests.getUser(req)
  const userEditForm = req.body
  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const target = await UserController.getOne({ id: userEditForm.user.id })

  _next(Authorizer.canEditUser({ cycle, countryIso, target, user }), next)
}

const requireInviteUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { assessmentName, countryIso, cycleName } = { ...req.params, ...req.query, ...req.body } as CycleParams
  const user = Requests.getUser(req)
  const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  _next(Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0, next)
}

const requireViewUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso, id } = { ...req.params, ...req.query, ...req.body } as CycleParams & {
    id: string
  }
  const user = Requests.getUser(req)
  const isAdministrator = Users.isAdministrator(user)
  const isSelf = String(user?.id) === String(id)

  const { cycle } = req.context

  const rolesAllowedToView = Users.getRolesAllowedToView({ user, countryIso, cycle })
  _next(isAdministrator || isSelf || rolesAllowedToView.length > 0, next)
}

const requireViewUsers = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso, print } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleParams & { print?: string }
  const user = Requests.getUser(req)
  const { cycle } = req.context

  _next((print === 'true' && Cycles.isPublished(cycle)) || Authorizer.canViewUsers({ user, countryIso, cycle }), next)
}

const requireEditRepositoryItem = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const user = Requests.getUser(req)

  const { country, cycle } = req.context
  _next(Authorizer.canEditRepositoryItem({ country, cycle, user }), next)
}

const requireUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const user = Requests.getUser(req)

  _next(Boolean(user), next)
}

const requireViewRepositoryFile = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso: areaCode, uuid } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleParams & { uuid: string }

  const { assessment, cycle } = req.context
  const repositoryItem = await CycleDataController.Repository.getOne({ assessment, cycle, uuid })
  const user = Requests.getUser(req)
  const { country } = req.context

  _next(Authorizer.canViewRepositoryItem({ assessment, cycle, country, areaCode, user, repositoryItem }), next)
}

const requireViewHistory = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { sectionName } = {
    ...req.params,
    ...req.query,
    ...req.body,
  } as CycleParams & { sectionName: string }
  const user = Requests.getUser(req)

  const { assessment, cycle } = req.context
  const section = await MetadataController.getSubSection({ assessment, cycle, sectionName })

  const { country } = req.context

  _next(Authorizer.canViewHistory({ country, cycle, section, user }), next)
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
  requireViewHistory: tryCatch(requireViewHistory),
  requireViewRepositoryFile: tryCatch(requireViewRepositoryFile),
  requireViewUser: tryCatch(requireViewUser),
  requireViewUsers: tryCatch(requireViewUsers),
}
