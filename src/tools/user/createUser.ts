import '../scriptInit'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { RoleName } from 'meta/user/role/name'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { passwordHash } from 'server/api/auth/utils/passwordUtils'
import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

// Usage: ts-node src/tools/createUser/createUser.ts <email> <password> <role> <countryIso>
// Examples:
//   ts-node src/tools/createUser/createUser.ts user@test.com secret123 REVIEWER FIN
//   ts-node src/tools/createUser/createUser.ts rfp@test.com secret123 REGIONAL_FOCAL_POINT africa

const cycleName = CycleNames.latest
const assessmentName = AssessmentNames.fra

const [, , email, password, role, countryIso] = process.argv
const validRoles: Array<RoleName> = Object.values(RoleName)

// generic validation of params
const validate = (): void => {
  if (!email || !password || !role || !countryIso) {
    Logger.error('Usage: ts-node src/tools/createUser/createUser.ts <email> <password> <role> <countryIso>')
    process.exit(1)
  }

  if (role === RoleName.ADMINISTRATOR) {
    Logger.error('For ADMINISTRATOR use createAdmin: ts-node src/tools/createUser/createAdmin.ts')
    process.exit(1)
  }

  if (!validRoles.includes(role as RoleName)) {
    Logger.error(`Invalid role "${role}". Valid roles: ${validRoles.join(', ')}`)
    process.exit(1)
  }
}

type UserProps = { email: string; password: string; role: RoleName; countryIso: string }

export const createUser = async ({ countryIso, email, password, role }: UserProps): Promise<void> => {
  const hashedPassword = await passwordHash(password)
  const name = email.split('@').at(0)

  // user
  const user = await DB.one<{ uuid: string }>(
    `insert into public.users (status, email, props)
            values ('active', $1, jsonb_build_object('name', $2, 'lang', 'en'))
            returning uuid`,
    [email, name]
  )

  // password
  await DB.none(
    `insert into public.users_auth_provider (user_uuid, provider, props)
            values ($1, 'local', jsonb_build_object('password', $2))`,
    [user.uuid, hashedPassword]
  )

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName,
    cycleName,
  })

  // role
  await DB.none(
    `insert into public.users_role (assessment_uuid, cycle_uuid, country_iso, user_uuid, role, props)
     values ($1, $2, $3, $4, $5, '{}')`,
    [assessment.uuid, cycle.uuid, countryIso, user.uuid, role]
  )

  Logger.info(`User created: ${email} / ${role} / ${countryIso}`)
}

if (require.main === module) {
  validate()
  ToolsUtils.exec(() => createUser({ email, password, role: role as RoleName, countryIso }))
}
