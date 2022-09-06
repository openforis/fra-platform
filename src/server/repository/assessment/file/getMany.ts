import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, AssessmentFile } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

const fields: Array<string> = ['id', 'uuid', 'country_iso']

const selectFields = fields.map((f) => `f.${f}`).join(',')

export const getMany = async (
  props: { assessment: Assessment; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<AssessmentFile>> => {
  const { assessment, countryIso } = props

  const schemaName = Schemas.getName(assessment)

  return client.map<AssessmentFile>(
    `select ${selectFields} from ${schemaName}.file f where f.country_iso = $1;`,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
