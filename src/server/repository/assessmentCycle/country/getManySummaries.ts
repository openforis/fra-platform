import { Objects } from 'utils/objects'

import { CountryAdmin } from 'meta/area'
import { AssessmentStatus } from 'meta/area/country'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { activityLogMessageUpdates } from './getMany'

type Props = {
  assessment: Assessment
  cycle: Cycle
  limit: string
  offset: string
}

export const getManySummaries = async (props: Props, client: BaseProtocol = DB): Promise<Array<CountryAdmin>> => {
  const { assessment, cycle, limit, offset } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map(
    `
        with country as
                 (select c.country_iso, c.props ->> 'status' as status
                  from ${schemaCycle}.country c
                  order by 1
                  limit $1 offset $2),
             last_edit as
                 (select c.country_iso, max(a.time) as last_edit
                  from country c
                           left join public.activity_log a
                                     on c.country_iso = a.country_iso
                  where a.cycle_uuid = '${cycle.uuid}'
                    and a.message in (${activityLogMessageUpdates})
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
               coalesce(us.invitations_accepted_count, 0) as invitations_accepted_count,
               coalesce(us.invitations_sent_count, 0)     as invitations_sent_count,
               coalesce(us.users_count, 0)                as users_count,
               case
                   when le.last_edit is null then '${AssessmentStatus.notStarted}'
                   when c.status is null and le.last_edit is not null then '${AssessmentStatus.editing}'
                   else c.status
                   end                                      as status

        from country c
                 left join last_edit le on c.country_iso = le.country_iso
                 left join user_summary us on c.country_iso = us.country_iso
        order by 1
        ;
  
  `,
    [limit, offset],
    (rows) => Objects.camelize(rows)
  )
}
