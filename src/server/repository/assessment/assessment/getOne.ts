import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentAdapter } from 'server/repository/adapter'

import { selectFields } from './selectFields'

export const getOne = async (
  props: { assessmentName: string; metaCache?: boolean } | { id: number; metaCache?: boolean },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  return client.one(
    `
        select ${selectFields},
               jsonb_agg(to_jsonb(ac.*)) as cycles
            ${props.metaCache ? `, meta_cache` : ''}
        from assessment a
                 left join assessment_cycle ac on a.id = ac.assessment_id
        where ${'id' in props ? `a.id = $1` : `a.props->>'name' = $1`}
        group by ${selectFields};
    `,
    ['id' in props ? props.id : props.assessmentName],
    AssessmentAdapter
  )
}
