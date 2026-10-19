import 'tsconfig-paths/register'
import 'dotenv/config'

import { passwordHash } from 'server/api/auth/utils/passwordUtils'
import { DB } from 'server/db/db'
import { Logger } from 'server/utils/logger'

const ADMIN = {
  name: 'Admin',
  email: 'test@test.com',
  password: 'password123',
}

const exec = async (): Promise<void> => {
  const password = await passwordHash(ADMIN.password)
  const user = await DB.one(
    `
        insert into public.users (status, email, props)
        values ('active', '${ADMIN.email}', jsonb_build_object('name', '${ADMIN.name}', 'lang', 'en')) returning id, uuid;
    `
  )

  await DB.none(
    `
        insert into public.users_auth_provider (user_uuid, provider, props)
        values ('${user.uuid}', 'local', jsonb_build_object('password', '${password}'))
    `
  )

  await DB.none(
    `
        insert into public.users_role (user_uuid, role, props)
        values ('${user.uuid}', 'ADMINISTRATOR', '{}')
    `
  )
}

exec()
  .then(() => {
    Logger.info('Admin created')
    process.exit(0)
  })
  .catch((e) => {
    Logger.error(e)
    process.exit(1)
  })
