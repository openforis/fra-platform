import { Objects } from '@core/utils'

import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'

const fields: Array<string> = ['id', 'uuid', 'props']

const selectFields = fields.map((f) => `a.${f}`).join(',')

export const read = async (
  props: { assessmentName: string; metaCache?: boolean } | { id: number; metaCache?: boolean },
  client: BaseProtocol = DB
): Promise<Assessment> => {
  const { metacache, ...assessment } = await client.one(
    `
        select ${selectFields},
               jsonb_agg(to_jsonb(ac.*)) as cycles
            ${props.metaCache ? `, meta_cache as metacache` : ''}
        from assessment a
                 left join assessment_cycle ac on a.id = ac.assessment_id
        where ${'id' in props ? `a.id = $1` : `a.props->>'name' = $1`}
        group by ${selectFields};
    `,
    ['id' in props ? props.id : props.assessmentName]
  )
  return {
    ...Objects.camelize(assessment),
    metaCache: metacache,
  }
}
