import { AssessmentBase } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { AssessmentAdapter } from 'server/db/repository/adapter'
import { selectFields } from 'server/db/repository/assessment/assessment/selectFields'

type PropsName = { assessmentName: string }
type PropsId = { id: number }
type PropsUuid = { uuid: string }
type Props = PropsName | PropsId | PropsUuid

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentBase> => {
  let whereClause: string
  let queryParam: number | string

  if ('id' in props) {
    whereClause = 'a.id = $1'
    queryParam = props.id
  } else if ('uuid' in props) {
    whereClause = 'a.uuid = $1'
    queryParam = props.uuid
  } else if ('assessmentName' in props) {
    whereClause = "a.props->>'name' = $1"
    queryParam = props.assessmentName
  } else {
    throw new Error('At least one of assessmentName, id, or uuid must be provided')
  }

  return client.one<AssessmentBase>(
    `
    select ${selectFields},
           coalesce(jsonb_agg(to_jsonb(ac.*) order by (ac.props ->> 'dateCreated')::timestamptz) filter ( where ac.uuid is not null ), '[]') as cycles
    from assessment a
    left join assessment_cycle ac on a.uuid = ac.assessment_uuid
    where ${whereClause}
    group by ${selectFields}
    `,
    [queryParam],
    AssessmentAdapter
  )
}
