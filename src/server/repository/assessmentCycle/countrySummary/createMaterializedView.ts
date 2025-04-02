import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const createMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const query = `
      create materialized view if not exists ${schemaCycle}.country_summary as
      with country as
               (select c.country_iso, c.status as status
                from ${schemaCycle}.country c)
           , user_roles as (
               select ur.country_iso, ur.user_uuid
               from public.users_role ur
               where ur.cycle_uuid = '${cycle.uuid}'
           ),
           user_invitations as (
               select ui.country_iso,
                      ui.user_uuid,
                      ui.invited_at,
                      ui.accepted_at
               from public.users_invitation ui
               where ui.cycle_uuid = '${cycle.uuid}'
           ),
           unique_users as (
               select user_uuid, country_iso
               from (
                    select user_uuid, country_iso from user_roles
                    union
                    select user_uuid, country_iso from user_invitations
               ) combined_users
           ),
           user_summary as (
               select c.country_iso,
                      count(distinct ui.user_uuid) filter (where ui.invited_at is not null) as invitations_sent_count,
                      count(distinct ui.user_uuid) filter (where ui.accepted_at is not null) as invitations_accepted_count,
                      count(distinct uu.user_uuid) as users_count
               from country c
                    left join user_invitations ui on c.country_iso = ui.country_iso
                    left join unique_users uu on c.country_iso = uu.country_iso
               group by 1
           )
      select c.country_iso
           , coalesce(us.invitations_accepted_count, 0) as invitations_accepted_count
           , coalesce(us.invitations_sent_count, 0)     as invitations_sent_count
           , coalesce(us.users_count, 0)                as users_count
      from country c
               left join user_summary us on c.country_iso = us.country_iso
      ;
  `

  await client.query(query, [])

  await client.query(`CREATE UNIQUE INDEX ON ${schemaCycle}.country_summary (country_iso);`)
}
