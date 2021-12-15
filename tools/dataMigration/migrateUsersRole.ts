import { BaseProtocol } from '../../server/db'
import { Assessment } from '../../meta/assessment'

type Props = {
  assessment: Assessment
  client: BaseProtocol
}

export const migrateUsersRole = async (props: Props): Promise<void> => {
  const { assessment, client } = props

  await client.query(
    `
        delete
        from users_role;

        drop materialized view if exists _temp;

        create materialized view _temp as
        with r as (
            select cca.user_id,
                   cca.country_iso,
                   jsonb_array_elements((cca.tables -> 'tables')::jsonb) as tables
            from _legacy.collaborators_country_access cca
        ),
             d as (
                 select r.country_iso,
                        r.tables ->> 'section'::varchar as section_name,
                        r.tables ->> 'tableNo'::varchar as table_no,
                        s.uuid                          as section_uuid,
                        u.id                            as user_id,
                        u_l.email,
                        u_l.id                          as user_id_legacy
                 from r
                          left join assessment_fra.section s
                                    on r.tables -> 'tableNo' = s.props -> 'anchor'
                          left join _legacy.fra_user u_l on r.user_id = u_l.id
                          left join users u on u_l.email = u.email
             ),
             q as (
                 select d.country_iso,
                        d.user_id,
                        d.user_id_legacy,
                        d.email,
                        jsonb_object_agg(
                                case
                                    when d.section_name = 'all' then 'all'
                                    when d.section_name = 'none' then 'none'
                                    else
                                        d.section_uuid::varchar end,
                                true
                            )
                            as sections
                 from d
                 group by d.country_iso,
                          d.user_id,
                          d.user_id_legacy,
                          d.email
             )
        select q.country_iso,
               q.user_id,
               q.user_id_legacy,
               q.email,
               case
                   when q.sections -> 'all' = 'true' then '"all"'::jsonb
                   when q.sections -> 'none' = 'true' then '"none"'::jsonb
                   else q.sections
                   end as sections
        from q
        ;

        insert into users_role (user_id, assessment_id, country_iso, cycle_uuid, role, props)
        select us.id,
               case when r.role = 'ADMINISTRATOR' then null else ${assessment.id} end      as assessment_id,
               case when r.role = 'ADMINISTRATOR' then null else r.country_iso end         as country_iso,
               case when r.role = 'ADMINISTRATOR' then null else '${assessment.cycles[0].uuid}'::uuid end as cycle_uuid,
               r.role::user_role,
               case
                   when t.sections is not null then jsonb_build_object('sections', t.sections)
                   else '{}'::jsonb
                   end
                                                                                           as roles
        from _legacy.fra_user u
                 left join _legacy.user_country_role r on u.id = r.user_id
                 left join users us on us.email = u.email
                 left join _temp t on u.id = t.user_id_legacy and r.country_iso = t.country_iso
        ;

        drop materialized view _temp;
    `
  )
}
