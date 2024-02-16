import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
      WITH subquery AS (
          SELECT ur.id AS users_role_id,
                 u.uuid AS inviting_user_uuid
          FROM public.activity_log al
          JOIN public.users_role ur 
                        ON ur.user_id = (al.target ->> 'userId')::bigint
                       AND ur.country_iso = al.country_iso
                       AND ur.role = (al.target ->> 'role')::user_role
                       AND ur.cycle_uuid = al.cycle_uuid 
          JOIN public.users u ON u.id = al.user_id
          WHERE al.section = 'users' 
            AND al.message = 'invitationAdd'
      )
      UPDATE public.users_role AS ur
      SET invited_by_user_uuid = subquery.inviting_user_uuid
      FROM subquery
      WHERE ur.id = subquery.users_role_id
  `)
}
