import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, AssessmentFile } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const create = async (
  props: { assessment: Assessment; countryIso?: CountryIso; file: Express.Multer.File },
  client: BaseProtocol = DB
): Promise<AssessmentFile> => {
  const {
    assessment,
    countryIso,
    file: { originalname, buffer },
  } = props

  const schemaName = Schemas.getName(assessment)

  return client.one<AssessmentFile>(
    `
      insert into ${schemaName}.file (country_iso, file_name, file) values ($1, $2, $3) returning id, uuid, country_iso, file_name;
    `,
    [countryIso, originalname, buffer],
    Objects.camelize
  )
}
