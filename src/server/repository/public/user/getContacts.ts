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

const _getField = (field: ContactField, raw: string): string => `, jsonb_build_object(
              'countryIso', ur.country_iso,
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
      select u.uuid
           , ur.country_iso
           , jsonb_build_object('readOnly', true) as props
           , null                                 as parent_uuid
           , 'contact'                            as type
           , null                                 as value
          ${_getField(ContactField.appellation, `lower(u.props ->> 'title')`)}
           ${_getField(ContactField.contributions, `'[]'::jsonb`)}
           ${_getField(ContactField.institution, `ur.props ->> 'organization'`)}
           ${_getField(ContactField.name, `u.props ->> 'name'`)}
           ${_getField(ContactField.role, `ur.role`)}
           ${_getField(ContactField.surname, `u.props ->> 'surname'`)}
      from public.users u
               left join public.users_role ur on (u.id = ur.user_id)
      where ur.role in ($4:list)
        and ur.country_iso = $3
        and ur.cycle_uuid = $2
        and ur.assessment_id = $1
        and u.status = 'active'
      group by u.id, ur.id
  `

  const queryParams = [assessment.id, cycle.uuid, countryIso, roles]

  return client.map<Contact>(query, queryParams, (row) => Objects.camelize(row))
}
