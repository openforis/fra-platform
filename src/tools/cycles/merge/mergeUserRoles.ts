import { PropsMerge } from 'tools/cycles/merge/_types'

import { BaseProtocol } from 'server/db/db'

export const mergeUserRoles = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { countryISOs, cycleFrom, cycleTo } = props

  const params = { countryISOs, cycleUuidFrom: cycleFrom.uuid, cycleUuidTo: cycleTo.uuid }

  await client.query(
    `
        insert into public.users_role
        (assessment_uuid, cycle_uuid, country_iso, user_uuid, role, props, permissions, invitation_uuid, created_at)
        select assessment_uuid,
               $(cycleUuidTo),
               country_iso,
               user_uuid,
               role,
               props,
               permissions,
               invitation_uuid,
               created_at
        from public.users_role
        where country_iso in ($(countryISOs:list))
          and cycle_uuid = $(cycleUuidFrom) on conflict (user_uuid, assessment_uuid, country_iso, cycle_uuid) do
        update
            set role = excluded.role,
            props = excluded.props,
            permissions=excluded.permissions,
            invitation_uuid=excluded.invitation_uuid,
            created_at=excluded.created_at`,
    params
  )
}
