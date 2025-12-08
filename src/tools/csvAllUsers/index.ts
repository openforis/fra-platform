import '../scriptInit'

import { AssessmentNames } from 'meta/assessment/assessment'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { BaseProtocol, DB } from 'server/db/db'

const client: BaseProtocol = DB

const assessmentName = AssessmentNames.fra
const cycleName = '2025'

const roles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]

const _flattenUsers = (user: User): Array<Record<string, unknown>> => {
  const { roles: userRoles, ...userRest } = user
  return userRoles
    .filter((role) => roles.includes(role.role))
    .map((role) => {
      const { props, ...roleRest } = role
      const { address = {}, contactPreference = {}, ...propsRest } = props || {}

      return {
        ...userRest,
        ...roleRest,
        ...propsRest,
        ...Objects.flatten(address, 'address'),
        ...Objects.flatten(contactPreference, 'contactPreference'),
      }
    })
}

const _removeFields = (userFlat: Record<string, unknown>): Record<string, unknown> => {
  const fieldsToRemove = [
    'id',
    'uuid',
    'userUuid',
    'createdAt',
    'cycleUuid',
    'assessmentUuid',
    'invitationUuid',
    'invitations',
    'permissions',
  ]

  const result = { ...userFlat }
  fieldsToRemove.forEach((field) => {
    delete result[field]
  })

  return result
}

const _escapeCSVField = (field: unknown): string => {
  const str = String(field ?? '')
  // If field contains comma, quote, or newline, wrap in quotes and escape existing quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

const _normalizeData = (data: Array<Record<string, unknown>>): Array<Record<string, unknown>> => {
  const allKeys = new Set<string>()

  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => allKeys.add(key))
  })

  return data.map((obj) => {
    const normalized: Record<string, unknown> = {}
    allKeys.forEach((key) => {
      normalized[key] = _escapeCSVField(obj[key] ?? '')
    })
    return normalized
  })
}

const main = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const users = await UserController.getMany({ assessment, cycle, filters: { roles } })

  const usersFlat = users.flatMap(_flattenUsers).map(_removeFields)
  const normalizedUsers = _normalizeData(usersFlat)

  await CSV.write(normalizedUsers, 'all-users-nc-anc')
}

ToolsUtils.exec(main)
