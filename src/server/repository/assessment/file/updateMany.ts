import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment'
import { AssessmentFile, AssessmentFileProps } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { selectFields } from './selectFields'

type Props = {
  assessment: Assessment
  UUIDs: Array<string>
  props: AssessmentFileProps
}

export const updateMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<AssessmentFile>> => {
  const { assessment, UUIDs, props: _props } = props

  const schemaName = Schemas.getName(assessment)

  return client.map<AssessmentFile>(
    `
      update ${schemaName}.file f
      set props = props || $2::jsonb
      where uuid in ($1:list)
      returning ${selectFields}
    `,
    [UUIDs, _props],
    (row) => Objects.camelize(row)
  )
}
