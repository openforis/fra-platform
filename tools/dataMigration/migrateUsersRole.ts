import { Assessment } from '../../src/meta/assessment/assessment'
import { BaseProtocol } from '../../src/server/db'

type Props = {
  assessment: Assessment
  client: BaseProtocol
}

export const migrateUsersRole = async (props: Props): Promise<void> => {
  const { assessment, client } = props
  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')

  await client.query(
    `
        delete
        from users_role;

        drop materialized view if exists _temp;

        create materialized view _temp as
        with r as (select cca.user_id,
                          cca.country_iso,
                          jsonb_array_elements((cca.tables -> 'tables')::jsonb) as tables
                   from _legacy.collaborators_country_access cca),
             d as (select r.country_iso,
                          r.tables ->> 'section'::varchar as section_name,
                          r.tables ->> 'tableNo'::varchar as table_no,
                          s.uuid                          as section_uuid,
                          u.id                            as user_id,
                          u_l.email,
                          u_l.id                          as user_id_legacy
                   from r
                            left join assessment_fra.section s
                                      on r.tables -> 'tableNo' = s.props -> 'anchors' -> '${cycle2020.uuid}'
                            left join _legacy.fra_user u_l on r.user_id = u_l.id
                            left join users u on u_l.email = u.email),
             q as (select d.country_iso,
                          d.user_id,
                          d.user_id_legacy,
                          d.email,
                          jsonb_object_agg(
                                  case
                                      when d.section_name = 'all' then 'all'
                                      when d.section_name = 'none' then 'none'
                                      else
                                          d.section_uuid::varchar end,
                                  '{ "tableData": true, "descriptions": true }'::jsonb
                              )
                              as sections
                   from d
                   group by d.country_iso,
                            d.user_id,
                            d.user_id_legacy,
                            d.email)
        select q.country_iso,
               q.user_id,
               q.user_id_legacy,
               q.email,
               case
                   when q.sections -> 'all' is not NULL then '"all"'::jsonb
                   when q.sections -> 'none' is not NULL then '"none"'::jsonb
                   else q.sections
                   end as sections
        from q
        ;

        insert into users_role (user_id, assessment_id, country_iso, cycle_uuid, role, permissions, props, invitation_uuid,
                                invited_at, accepted_at)
        select us.id,
               case when r.role = 'ADMINISTRATOR' then null else ${assessment.id} end                     as assessment_id,
               case when r.role = 'ADMINISTRATOR' then null else r.country_iso end                        as country_iso,
               case when r.role = 'ADMINISTRATOR' then null else '${assessment.cycles[0].uuid}'::uuid end as cycle_uuid,
               r.role::user_role,
               case
                   when t.sections is not null then jsonb_build_object('sections', t.sections)
                   else '{}'::jsonb
                   end
                                                                                                          as permissions,
               case
                   when u.institution is not null and u.position is not null then jsonb_build_object('organization', u.institution, 'professionalTitle', u.position)
                   when u.institution is not null then jsonb_build_object('organization', u.institution)
                   when u.position is not null then jsonb_build_object('professionalTitle', u.position)
                   else '{}'::jsonb
               end
                                                                                                          as props,
               null                                                                                       as invitation_uuid,
               null                                                                                       as invited_at,
               null                                                                                       as accepted_at
        from _legacy.fra_user u
                 left join _legacy.user_country_role r on u.id = r.user_id
                 left join users us on lower(trim(us.email)) = lower(trim(u.email))
                 left join _temp t on u.id = t.user_id_legacy and r.country_iso = t.country_iso
        ;

        drop materialized view _temp;
    `
  )
}
