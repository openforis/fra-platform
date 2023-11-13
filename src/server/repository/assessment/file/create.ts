import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment'
import { AssessmentFile } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  file: Express.Multer.File
  private?: boolean
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentFile> => {
  const { assessment, countryIso, file, private: _private } = props
  const { originalname, buffer } = file

  const schemaName = Schemas.getName(assessment)

  return client.one<AssessmentFile>(
    `
        insert into ${schemaName}.file (country_iso, file_name, file, private)
        values ($1, $2, $3, $4)
        returning id, uuid, country_iso, file_name, private;
    `,
    [countryIso, originalname, buffer, _private],
    Objects.camelize
  )
}
