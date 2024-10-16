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

  // ---- 1. Move users_role table to _legacy schema
  await client.query(`alter table public.users_role set schema _legacy;`)

  // ---- 2. Create new users_role table in public schema
  await client.query(getUsersRoleDDL())

  // ---- 3. Create users_invitation table
  await client.query(getUsersInvitationDDL())

  // ---- 4. Populate new users_role table from _legacy
  await client.query(`
    insert into public.users_role (
      id, user_id, assessment_id, country_iso, role, props, cycle_uuid, permissions
    )
    select 
      id, user_id, assessment_id, country_iso, role,  props, cycle_uuid, permissions
    from _legacy.users_role;
  `)

  // ---- 5. Populate users_invitation table from _legacy
  await client.query(`
    insert into public.users_invitation (
      user_id, assessment_id, country_iso, role, cycle_uuid, invitation_uuid, invited_at, accepted_at, invited_by_user_uuid
    )
    select 
      user_id, assessment_id, country_iso, role, cycle_uuid, invitation_uuid, invited_at, accepted_at, invited_by_user_uuid
    from _legacy.users_role
    where invitation_uuid is not null;
  `)

  Logger.info('Migration completed successfully')
}
