import '../scriptInit'

import { RoleName } from 'meta/user/role/name'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { createUser } from './createUser'

const countryIso = 'X01'

const USERS = [
  { email: 'reviewer@test.com', password: 'test1234', role: RoleName.REVIEWER, countryIso },
  { email: 'nc@test.com', password: 'test1234', role: RoleName.NATIONAL_CORRESPONDENT, countryIso },
  { email: 'anc@test.com', password: 'test1234', role: RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, countryIso },
  { email: 'collaborator@test.com', password: 'test1234', role: RoleName.COLLABORATOR, countryIso },
  { email: 'viewer@test.com', password: 'test1234', role: RoleName.VIEWER, countryIso },
]

const createUsers = async (): Promise<void> => {
  await Promise.all(USERS.map(createUser))
}

ToolsUtils.exec(createUsers)
