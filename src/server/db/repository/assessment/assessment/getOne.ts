import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { AssessmentAdapter } from 'server/db/repository/adapter'
import { selectFields } from 'server/db/repository/assessment/assessment/selectFields'

type Props =
  | {
      assessmentName: string
    }
  | {
      id: number
    }
  | {
      uuid: string
    }

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  let whereClause: string
  let queryValue: number | string

  if ('id' in props) {
    whereClause = 'a.id = $1'
    queryValue = props.id
  } else if ('uuid' in props) {
    whereClause = 'a.uuid = $1'
    queryValue = props.uuid
  } else if ('assessmentName' in props) {
    whereClause = "a.props->>'name' = $1"
    queryValue = props.assessmentName
  } else {
    throw new Error('At least one of assessmentName, id, or uuid must be provided')
  }

  return client.one(
    `
    select ${selectFields},
           coalesce(jsonb_agg(to_jsonb(ac.*)) filter ( where ac.uuid is not null ), '[]') as cycles
    from assessment a
    left join assessment_cycle ac on a.id = ac.assessment_id
    where ${whereClause}
    group by ${selectFields}
    `,
    [queryValue],
    AssessmentAdapter
  )
}
