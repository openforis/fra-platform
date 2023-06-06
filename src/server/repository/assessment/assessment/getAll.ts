import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentAdapter } from 'server/repository/adapter'

import { selectFields } from './selectFields'

export const getAll = async (props: { metaCache?: boolean }, client: BaseProtocol = DB): Promise<Array<Assessment>> => {
  return client.map(
    `
        select ${selectFields},
               jsonb_agg(to_jsonb(ac.*)) as cycles
            ${props.metaCache ? `, meta_cache` : ''}
        from assessment a
                 left join assessment_cycle ac on a.id = ac.assessment_id
        group by ${selectFields};
    `,
    [],
    AssessmentAdapter
  )
}
