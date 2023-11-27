import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment'
import { AssessmentFile, AssessmentFileProps } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  file: Express.Multer.File
  props?: AssessmentFileProps
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentFile> => {
  const { assessment, countryIso, file, props: _props } = props
  const { originalname, buffer } = file

  const schemaName = Schemas.getName(assessment)

  return client.one<AssessmentFile>(
    `
        insert into ${schemaName}.file (country_iso, file_name, file, props)
        values ($1, $2, $3, $4::jsonb)
        returning id, uuid, country_iso, file_name, props;
    `,
    [countryIso, originalname, buffer, JSON.stringify(_props)],
    Objects.camelize
  )
}
