import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getBaseQuery = (props: Props): string => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return `
    with country as (
      select c.country_iso, 
             c.status,
             c.last_update,
             c.last_edit,
             c.last_edit_odp,
             c.last_in_editing,
             c.last_in_review,
             c.last_in_approval,
             c.last_in_accepted
      from ${schemaCycle}.country c
    ),
    user_roles as (
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
    ),
    country_summary as (
      select c.country_iso,
             coalesce(us.invitations_accepted_count, 0) as invitations_accepted_count,
             coalesce(us.invitations_sent_count, 0) as invitations_sent_count,
             coalesce(us.users_count, 0) as users_count,
             c.status,
             c.last_update,
             c.last_edit,
             c.last_edit_odp,
             c.last_in_editing,
             c.last_in_review,
             c.last_in_approval,
             c.last_in_accepted
      from country c
           left join user_summary us on c.country_iso = us.country_iso
    )
  `
}
