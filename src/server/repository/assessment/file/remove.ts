import { Objects } from 'utils/objects'

import { Assessment, AssessmentFile } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const remove = async (
  props: { assessment: Assessment; uuid: string },
  client: BaseProtocol = DB
): Promise<AssessmentFile | undefined> => {
  const { assessment, uuid } = props

  const schemaName = Schemas.getName(assessment)

  return client.oneOrNone<AssessmentFile | undefined>(
    `delete from ${schemaName}.file where uuid = $1 returning id, uuid, country_iso, file_name;`,
    [uuid],
    Objects.camelize
  )
}
