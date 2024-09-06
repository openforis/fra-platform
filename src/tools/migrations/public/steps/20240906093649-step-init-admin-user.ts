import { passwordHash } from 'server/api/auth/utils/passwordUtils'
import { DB } from 'server/db'

const ADMIN = {
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin1234',
}

export default async () => {
  const password = await passwordHash(ADMIN.password)
  const user = await DB.one(
    `
      insert into public.users (status, email, props)
      values ('active', '${ADMIN.email}', jsonb_build_object('name', '${ADMIN.name}', 'lang', 'en'))
      returning id;
    `
  )

  await DB.none(
    `
      insert into public.users_auth_provider (user_id, provider, props)
      values (${user.id}, 'local', jsonb_build_object('password', '${password}'))
    `
  )

  await DB.none(
    `
      insert into public.users_role (user_id, role, props)
      values (${user.id}, 'ADMINISTRATOR', '{}')
    `
  )
}
