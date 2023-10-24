import { AssessmentStatus } from 'meta/area/country'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { activitiesLastEdit, activitiesLastEditOdpData } from './_lastEditActivities'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const createMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(
    `
        create materialized view if not exists ${schemaCycle}.country_summary as
        with country as
                 (select c.country_iso, c.props ->> 'status' as status
                  from ${schemaCycle}.country c),
             last_edit as
                 (select c.country_iso, max(a.time) as last_edit
                  from country c
                           left join public.activity_log a
                                     on c.country_iso = a.country_iso
                  where a.cycle_uuid = '${cycle.uuid}'
                    and a.message in (${activitiesLastEdit})
                  group by 1),
             last_edit_odp_data as
                  (select c.country_iso, max(a.time) as last_edit_odp_data
                  from country c
                           left join public.activity_log a
                                     on c.country_iso = a.country_iso
                  where a.cycle_uuid = '${cycle.uuid}'
                    and a.message in (${activitiesLastEditOdpData})
                  group by 1),
             user_summary as
                 (select c.country_iso,
                         count(c.country_iso) filter ( where ur.invited_at is not null )           as invitations_sent_count,
                         count(c.country_iso)
                         filter ( where ur.invited_at is not null and ur.accepted_at is not null ) as invitations_accepted_count,
                         count(c.country_iso)                                                      as users_count

                  from country c
                           left join public.users_role ur
                                     on c.country_iso = ur.country_iso
                  where ur.cycle_uuid = '${cycle.uuid}'
                  group by 1)
        select c.country_iso,
               le.last_edit,
               leo.last_edit_odp_data,
               coalesce(us.invitations_accepted_count, 0) as invitations_accepted_count,
               coalesce(us.invitations_sent_count, 0)     as invitations_sent_count,
               coalesce(us.users_count, 0)                as users_count,
               case
                   when le.last_edit is null then '${AssessmentStatus.notStarted}'
                   when c.status is null and le.last_edit is not null then '${AssessmentStatus.editing}'
                   else c.status
                   end                                    as status
        from country c
                 left join last_edit le on c.country_iso = le.country_iso
                 left join last_edit_odp_data leo on c.country_iso = leo.country_iso
                 left join user_summary us on c.country_iso = us.country_iso
        ;
    `,
    []
  )

  await client.query(`CREATE UNIQUE INDEX ON ${schemaCycle}.country_summary (country_iso);`)
}
