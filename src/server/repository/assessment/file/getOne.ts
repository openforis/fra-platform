import { Assessment, AssessmentFile } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const getOne = async (
  props: { assessment: Assessment; uuid: string },
  client: BaseProtocol = DB
): Promise<AssessmentFile | undefined> => {
  const { assessment, uuid } = props

  const schemaName = Schemas.getName(assessment)

  return client.oneOrNone<AssessmentFile | undefined>(`select * from ${schemaName}.file where uuid = $1`, [uuid], (row) => ({
    ...row,
    fileName: row.file_name,
  }))
}
