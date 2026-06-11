import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  name: CommentableDescriptionName
  sectionName: string
  sectionUuid?: UUID
  value: CommentableDescriptionValue | Array<DataSource>
}

export const upsert = async (props: Props, client: BaseProtocol = DB): Promise<string> => {
  const { assessment, countryIso, cycle, name, sectionName, sectionUuid, value } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // insert new | on conflict update
  const query = `
      insert into
          ${schemaCycle}.descriptions (country_iso, section_name, section_uuid, name, value)
          values ($(countryIso), $(sectionName), $(sectionUuid), $(name), $(value)::jsonb)
      on conflict (country_iso, section_name, section_uuid, name) do update 
            set value = $(value)::jsonb
      returning value;
    `

  return client.oneOrNone<string>(
    query,
    { countryIso, sectionName, sectionUuid, name, value: JSON.stringify(value) },
    Objects.camelize
  )
}
