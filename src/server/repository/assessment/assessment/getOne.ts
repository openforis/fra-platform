import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentAdapter } from 'server/repository/adapter'

import { selectFields } from './selectFields'

type Props = {
  assessmentName?: string
  id?: number
  uuid?: string
  metaCache?: boolean
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  const { assessmentName, id, uuid, metaCache } = props
  if (!assessmentName && !id && !uuid) {
    throw new Error('At least one of assessmentName, id, or uuid must be provided')
  }

  let whereClause: string
  let queryValue: number | string

  if (id) {
    whereClause = 'a.id = $1'
    queryValue = id
  } else if (uuid) {
    whereClause = 'a.uuid = $1'
    queryValue = uuid
  } else {
    whereClause = "a.props->>'name' = $1"
    queryValue = assessmentName
  }

  return client.one(
    `
    select ${selectFields},
           jsonb_agg(to_jsonb(ac.*)) as cycles
           ${metaCache ? ', meta_cache' : ''}
    from assessment a
    left join assessment_cycle ac on a.id = ac.assessment_id
    where ${whereClause}
    group by ${selectFields}
    `,
    [queryValue],
    AssessmentAdapter
  )
}
