import { Assessment, AssessmentFile } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getOne = async (
  props: { assessment: Assessment; id: number },
  client: BaseProtocol = DB
): Promise<AssessmentFile | undefined> => {
  const { assessment, id } = props

  const schemaName = Schemas.getName(assessment)

  return client.oneOrNone<AssessmentFile | undefined>(`select * from ${schemaName}.file where id = $1`, [id])
}
