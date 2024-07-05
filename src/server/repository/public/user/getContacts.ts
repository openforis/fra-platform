import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact, ContactField } from 'meta/cycleData'
import { RoleName } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

const _getField = (field: ContactField, raw: string): string => `jsonb_build_object(
              'countryIso', u.country_iso,
              'parentUuid', u.uuid,
              'props', jsonb_build_object('field', '${field}'),
              'type', 'contact',
              'uuid', u.uuid,
              'value', jsonb_build_object('raw', ${raw})
             )                                    as ${field}`

export const getContacts = async (props: Props, client: BaseProtocol = DB): Promise<Array<Contact>> => {
  const { countryIso, assessment, cycle } = props

  const roles = [RoleName.COLLABORATOR, RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]

  const query = `
      with users_disagg as
          (select u.id
                , u.uuid
                , u.props
                , ur.country_iso
                , ur.role
                , ur.props                     as props_role
                , row_to_json(jsonb_each(
                      (case
                           when ur.permissions -> 'sections' is null or
                                ur.permissions ->> 'sections' in ('all', 'none')
                               then jsonb_build_object(
                                   'sections',
                                   jsonb_build_object(
                                           coalesce(ur.permissions ->> 'sections', 'all'),
                                           jsonb_build_object('tableData', true)
                                   ))
                           else ur.permissions
                          end) -> 'sections')) as section
           from public.users u
                    left join public.users_role ur on (u.id = ur.user_id)
           where ur.role in ($4:list)
             and ur.country_iso = $3
             and ur.cycle_uuid = $2
             and ur.assessment_id = $1
             and u.status = 'active'
             and ((ur.accepted_at is not null and ur.invited_at is not null) or ur.invited_at is null))
         , users as
          (select u.id
                , u.uuid
                , u.props
                , u.country_iso
                , u.role
                , u.props_role
                , jsonb_agg(u.section ->> 'key') as contributions
           from users_disagg u
           where (u.section -> 'value' ->> 'tableData')::boolean is true
              or (u.section -> 'value' ->> 'descriptions')::boolean is true
           group by 1, 2, 3, 4, 5, 6)
      select u.uuid
           , u.country_iso
           , jsonb_build_object('readOnly', true, 'userId', u.id) as props
           , null                                                 as parent_uuid
           , 'contact'                                            as type
           , null                                                 as value
           , ${_getField(ContactField.appellation, `u.props ->> 'title'`)}
           , ${_getField(
             ContactField.contributions,
             `case
                    when u.contributions ? 'none' then jsonb_build_array('')
                    else u.contributions
                    end`
           )}
           , ${_getField(ContactField.institution, `u.props_role ->> 'organization'`)}
           , ${_getField(ContactField.name, `u.props ->> 'name'`)}
           , ${_getField(ContactField.role, `u.role`)}
           , ${_getField(ContactField.surname, `u.props ->> 'surname'`)}
           , case
                 when u.role = '${RoleName.NATIONAL_CORRESPONDENT}' then 1
                 when u.role = '${RoleName.ALTERNATE_NATIONAL_CORRESPONDENT}' then 2
                 else 3
          end                                                     as role_order
      from users u
      order by role_order, u.props ->> 'surname', u.props ->> 'name'
  `

  const queryParams = [assessment.id, cycle.uuid, countryIso, roles]

  return client.map<Contact>(query, queryParams, (row) => Objects.camelize(row))
}
