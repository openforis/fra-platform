import { Objects } from '@utils/objects'

import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'

const fields: Array<string> = ['id', 'uuid', 'props']

const selectFields = fields.map((f) => `a.${f}`).join(',')

export const getAll = async (props: { metaCache?: boolean }, client: BaseProtocol = DB): Promise<Array<Assessment>> => {
  return client.map(
    `
        select ${selectFields},
               jsonb_agg(to_jsonb(ac.*)) as cycles
            ${props.metaCache ? `, meta_cache as metacache` : ''}
        from assessment a
                 left join assessment_cycle ac on a.id = ac.assessment_id
        group by ${selectFields};
    `,
    [],
    ({ metacache, ...assessment }) => {
      return {
        ...Objects.camelize(assessment),
        metaCache: metacache,
      }
    }
  )
}
