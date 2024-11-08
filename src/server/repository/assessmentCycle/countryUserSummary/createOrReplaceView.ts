import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  schemaName?: string
}

export const createOrReplaceView = (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle, schemaName = Schemas.getNameCycle(assessment, cycle) } = props
  return client.query(
    `
        create or replace view ${schemaName}.country_user_summary as
        with user_data as (
            select
                u.uuid as user_uuid,
                u.email,
                u.props->>'name' as name,
                u.props->>'surname' as surname,
                concat(
                        coalesce(u.props->>'name', ''),
                        case when u.props->>'name' is not null and u.props->>'surname' is not null then ' ' else '' end,
                        coalesce(u.props->>'surname', '')
                ) as fullname,
                u.status
            from users u
        )
        select distinct on (ud.user_uuid, coalesce(ur.country_iso, ui.country_iso))
            ud.user_uuid,
            coalesce(ur.country_iso, ui.country_iso)  as country_iso,
            ud.name,
            ud.surname,
            ud.email,
            ud.fullname,
            ud.status,
            coalesce(to_jsonb(ur.*), '{}'::jsonb)     as role,
            case
                when
                  to_jsonb(ur.*) is null
                then
                  coalesce(to_jsonb(ui.*), '{}'::jsonb)
                else
                '{}'::jsonb
            end                                     as invitation
        from user_data ud
                 left join users_role ur on (ud.user_uuid = ur.user_uuid and ur.cycle_uuid = '${cycle.uuid}' and ur.assessment_uuid = '${assessment.uuid}')
                 left join users_invitation ui on (ud.user_uuid = ui.user_uuid and ui.cycle_uuid = '${cycle.uuid}' and ui.assessment_uuid = '${assessment.uuid}')
        where (ur.uuid is not null or ui.uuid is not null)
        order by
            ud.user_uuid,
            coalesce(ur.country_iso, ui.country_iso),
            country_iso asc,
            lower(ud.surname) asc nulls last,
            lower(ud.name) asc nulls last,
            ud.email asc,
            ur.uuid nulls last;
            
        comment on view ${schemaName}.country_user_summary is 'Shows users with their role or invitation by country/assessment/cycle';
        
      `
  )
}
