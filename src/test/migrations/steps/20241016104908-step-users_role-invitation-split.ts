import { BaseProtocol, DB } from 'server/db'
import { getUsersInvitationDDL, getUsersRoleDDL } from 'server/repository/public/ddl/getCreatePublicSchemaDDL'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export default async () => {
  // ---- 0. Check that the migration is not already ran
  const queryExists = `select exists (select from information_schema.tables where table_schema = 'public' and table_name = 'users_invitation');`
  const { exists } = await client.oneOrNone(queryExists)
  if (exists) {
    Logger.info('users_invitation table already exists')
    return
  }

  // ---- 1. Add unique index on users (uuid) table
  await client.query(`create unique index if not exists users_uuid_key on public.users (uuid);`)

  // ---- 2. Move users_role table to _legacy schema
  await client.query(`alter table public.users_role set schema _legacy;`)

  // ---- 3. Create users_invitation table
  await client.query(getUsersInvitationDDL())

  // ---- 4. Create new users_role table in public schema
  await client.query(getUsersRoleDDL())

  // ---- 5. Populate new users_role table from _legacy
  await client.query(`
    insert into public.users_role (
      user_uuid, assessment_uuid, country_iso, role, cycle_uuid, permissions, props, created_at
    )
    select 
      (select uuid from public.users where id = l_ur.user_id),
      (select uuid from public.assessment where id = l_ur.assessment_id),
      l_ur.country_iso,
      l_ur.role,
      l_ur.cycle_uuid,
      l_ur.permissions,
      l_ur.props,
      l_ur.invited_at as created_at
    from _legacy.users_role l_ur;
  `)

  // ---- 6. Populate users_invitation table from _legacy
  await client.query(`
    insert into public.users_invitation (
      uuid, user_uuid, assessment_uuid, country_iso, role, cycle_uuid, invited_at, accepted_at, invited_by_user_uuid, props
    )
    select 
      l_ur.invitation_uuid, 
      (select uuid from public.users where id = l_ur.user_id),
      (select uuid from public.assessment where id = l_ur.assessment_id),
      l_ur.country_iso, 
      l_ur.role, 
      l_ur.cycle_uuid, 
      l_ur.invited_at, 
      l_ur.accepted_at, 
      l_ur.invited_by_user_uuid,
      l_ur.props
    from _legacy.users_role l_ur
    where l_ur.invitation_uuid is not null;
  `)

  Logger.info('Migration completed successfully')
}
