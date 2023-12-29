import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableNames } from 'meta/assessment'
import { Contact, ContactField } from 'meta/cycleData'
import { RoleName } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

const _getField = (field: ContactField, raw: string): string => `jsonb_build_object(
              'countryIso', ur.country_iso,
              'parentUuid', u.uuid,
              'props', jsonb_build_object('field', '${field}'),
              'type', 'contact',
              'uuid', u.uuid,
              'value', jsonb_build_object('raw', ${raw})
             )                                    as ${field}`

export const getContacts = async (props: Props, client: BaseProtocol = DB): Promise<Array<Contact>> => {
  const { countryIso, assessment, cycle } = props

  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const roles = [RoleName.COLLABORATOR, RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]

  const query = `
      with odp as
          (select distinct coalesce((c.props -> 'forestCharacteristics' ->> 'useOriginalDataPoint'),
                                    'false')::boolean as use_1b
           from ${schemaCycle}."activity_log_${countryIso}" a
                    left join ${schemaCycle}.country c
                              on c.country_iso = '${countryIso}')
         , sections as
          (select distinct (jsonb_array_elements_text
                            (case
                                 when a.section = 'odp'
                                     then case
                                              when odp.use_1b
                                                  then '["${TableNames.extentOfForest}","${
    TableNames.forestCharacteristics
  }"]'::jsonb
                                              else '["${TableNames.extentOfForest}"]'::jsonb
                                     end
                                 else jsonb_build_array(a.section)
                      end
                            ))::text as section_name
           from ${schemaCycle}."activity_log_${countryIso}" a
                    left join odp
                              on odp.use_1b = odp.use_1b)
         , contributions as
          (select (a.user -> 'id')::numeric as user_id
                , jsonb_agg(s.uuid)         as section_uuids
           from ${schemaCycle}."activity_log_${countryIso}" a
                    left join sections ss
                              on a.section = ss.section_name
                    inner join ${schemaAssessment}.section s
                               on ss.section_name = s.props ->> 'name'
           group by a.user -> 'id')
      select u.uuid
           , ur.country_iso
           , jsonb_build_object('readOnly', true) as props
           , null                                 as parent_uuid
           , 'contact'                            as type
           , null                                 as value
           , ${_getField(ContactField.appellation, `lower(u.props ->> 'title')`)}
           , ${_getField(ContactField.contributions, `coalesce(c.section_uuids, '["none"]'::jsonb)`)}
           , ${_getField(ContactField.institution, `ur.props ->> 'organization'`)}
           , ${_getField(ContactField.name, `u.props ->> 'name'`)}
           , ${_getField(ContactField.role, `ur.role`)}
           , ${_getField(ContactField.surname, `u.props ->> 'surname'`)}
           , case
                 when ur.role = '${RoleName.NATIONAL_CORRESPONDENT}' then 1
                 when ur.role = '${RoleName.ALTERNATE_NATIONAL_CORRESPONDENT}' then 2
                 else 3
          end                                     as role_order
      from public.users u
               left join public.users_role ur on (u.id = ur.user_id)
               left join contributions c on u.id = c.user_id
      where ur.role in ($4:list)
        and ur.country_iso = $3
        and ur.cycle_uuid = $2
        and ur.assessment_id = $1
        and u.status = 'active'
        and ((ur.accepted_at is not null and ur.invited_at is not null) or ur.invited_at is null)
      group by u.id, ur.id, c.section_uuids
      order by role_order, u.props ->> 'surname', u.props ->> 'name'
  `

  const queryParams = [assessment.id, cycle.uuid, countryIso, roles]

  return client.map<Contact>(query, queryParams, (row) => Objects.camelize(row))
}
