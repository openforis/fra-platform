import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentAdapter } from 'server/repository/adapter'

import { selectFields } from './selectFields'

type Props =
  | {
      assessmentName: string
      metaCache?: boolean
    }
  | {
      id: number
      metaCache?: boolean
    }
  | {
      uuid: string
      metaCache?: boolean
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

  const { metaCache } = props

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
