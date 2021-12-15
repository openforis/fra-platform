import { Assessment } from '@meta/assessment'
import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

const fields: Array<string> = ['id', 'uuid', 'props']

const selectFields = fields.map((f) => `a.${f}`).join(',')

export const read = async (props: { name: string } | { id: number }, client: BaseProtocol = DB): Promise<Assessment> =>
  client.one<Assessment>(
    `
        select ${selectFields}, jsonb_agg(to_jsonb(ac.*) - 'id') as cycles
        from assessment a
                 left join assessment_cycle ac on a.id = ac.assessment_id
        where ${'id' in props ? `a.id = $1` : `a.props->>'name' = $1`}
        group by ${selectFields};
    `,
    ['id' in props ? props.id : props.name],
    Objects.camelize
  )
