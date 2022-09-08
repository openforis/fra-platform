import { Assessment, AssessmentFile } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getOne = async (
  props: { assessment: Assessment; id: number } | { assessment: Assessment; uuid: string },
  client: BaseProtocol = DB
): Promise<AssessmentFile | undefined> => {
  let where = ''
  let value = ''

  if ('id' in props) {
    where = 'where f.id = $1'
    value = String(props.id)
  } else if ('uuid' in props) {
    where = 'where f.uuid = $1'
    value = props.uuid
  } else {
    throw new Error('Missing parameter')
  }

  const { assessment } = props

  const schemaName = Schemas.getName(assessment)

  return client.oneOrNone<AssessmentFile | undefined>(`select * from ${schemaName}.file f  ${where}`, [value])
}
