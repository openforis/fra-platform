import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  name: CommentableDescriptionName
  sectionName: SectionName
  sectionUuid?: UUID
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<Array<CommentableDescription>> => {
  const { assessment, countryIso, cycle, name, sectionName, sectionUuid } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<CommentableDescription>(
    `
      delete
      from ${schemaCycle}.descriptions d
      where d.country_iso = $(countryIso)
        and d.name = $(name)
        and d.section_name = $(sectionName)
        and d.section_uuid = $(sectionUuid)
      returning *
    `,
    { countryIso, name, sectionName, sectionUuid },
    (row) => Objects.camelize(row)
  )
}
