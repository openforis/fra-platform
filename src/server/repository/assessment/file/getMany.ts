import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment'
import { AssessmentFile } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { selectFields } from 'server/repository/assessment/file/selectFields'

export const getMany = async (
  props: { assessment: Assessment; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<AssessmentFile>> => {
  const { assessment, countryIso } = props

  const schemaName = Schemas.getName(assessment)

  return client.map<AssessmentFile>(
    `
      select
        ${selectFields}
      from ${schemaName}.file f
      where
        (f.country_iso = $1
        or f.country_iso is null)
        and (f.props ->> 'hidden')::boolean is not true
      order by id
    `,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
