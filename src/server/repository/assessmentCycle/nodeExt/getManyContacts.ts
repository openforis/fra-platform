import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact, ContactField } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const getManyContacts = (props: Props, client: BaseProtocol = DB): Promise<Array<Contact>> => {
  const { assessment, cycle, countryIso } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<Contact>(
    `
        select c.*,
               to_jsonb(a.*) as appellation,
               to_jsonb(co.*) as contributions,
               to_jsonb(i.*) as institution,
               to_jsonb(n.*) as name,
               to_jsonb(r.*) as role,
               to_jsonb(s.*) as surname
        from ${schemaCycle}.node_ext c
              left join ${schemaCycle}.node_ext a on c.uuid = a.parent_uuid and a.props->>'field' = '${ContactField.appellation}'
              left join ${schemaCycle}.node_ext co on c.uuid = co.parent_uuid and co.props->>'field' = '${ContactField.contributions}'
              left join ${schemaCycle}.node_ext i on c.uuid = i.parent_uuid and i.props->>'field' = '${ContactField.institution}'
              left join ${schemaCycle}.node_ext n on c.uuid = n.parent_uuid and n.props->>'field' = '${ContactField.name}'
              left join ${schemaCycle}.node_ext r on c.uuid = r.parent_uuid and r.props->>'field' = '${ContactField.role}'
              left join ${schemaCycle}.node_ext s on c.uuid = s.parent_uuid and s.props->>'field' = '${ContactField.surname}'

        where c.parent_uuid is null and c.type = 'contact' and c.country_iso = $1
     `,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
