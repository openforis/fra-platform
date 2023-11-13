import { Assessment } from 'meta/assessment'
import { AssessmentFile } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  fileName?: string
  uuid?: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentFile | null> => {
  const { assessment, fileName, uuid } = props

  if (!fileName && !uuid) {
    throw new Error(`One between fileName and uuid is required`)
  }

  const schemaName = Schemas.getName(assessment)

  return client.oneOrNone<AssessmentFile>(
    `select *
     from ${schemaName}.file
     where ${uuid ? 'uuid' : 'file_name'} = $1`,
    [uuid ?? fileName],
    (row) => ({ ...row, fileName: row?.file_name })
  )
}
