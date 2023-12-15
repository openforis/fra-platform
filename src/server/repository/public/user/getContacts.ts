import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/cycleData'
import { RoleName } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'

type Props = { assessment: Assessment; cycle: Cycle; countryIso: CountryIso }
type Returned = Promise<Array<Contact>>
export const getContacts = async (props: Props, client: BaseProtocol = DB): Returned => {
  const { countryIso, assessment, cycle } = props
  const roles = [RoleName.COLLABORATOR, RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]

  const query = `
      select
          u.uuid,
          ur.country_iso,
          jsonb_build_object('readOnly', true) as props,
          jsonb_build_object(
                  'role',ur.role,
                  'appellation', lower(u.props ->> 'title'),
                  'name',u.props ->> 'name',
                  'surname',u.props ->> 'surname',
                  'institution',ur.props ->> 'organization',
                  'contributions', '[]'::jsonb
          ) as value
      from public.users u left join public.users_role ur on (u.id = ur.user_id)
      where
              ur.role in ($4:list)
          and ur.country_iso = $3
          and ur.cycle_uuid = $2
          and ur.assessment_id = $1
          and u.status = 'active'
      group by u.id, ur.id
  `

  const queryParams = [assessment.id, cycle.uuid, countryIso, roles]

  return client.map<Contact>(query, queryParams, (row) => Objects.camelize(row))
}
