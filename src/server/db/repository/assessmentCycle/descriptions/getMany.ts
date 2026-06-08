import pgPromise from 'pg-promise'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionTargets: Array<{
    name: CommentableDescriptionName
    sectionName: SectionName
  }>
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<CommentableDescription>> => {
  const { assessment, countryIso, cycle, descriptionTargets } = props

  if (Objects.isEmpty(descriptionTargets)) return []

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const pgp = pgPromise()
  const descriptionTargetValues = pgp.helpers.values(descriptionTargets, ['sectionName', 'name'])

  return client.map<CommentableDescription>(
    `
      select *
      from ${schemaName}.descriptions
      where country_iso = $(countryIso)
        and (section_name, name) in ($(descriptionTargetValues:raw))
    `,
    { countryIso, descriptionTargetValues },
    (row) => Objects.camelize(row)
  )
}
