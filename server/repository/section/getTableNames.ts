import { Assessment } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'

export const getTableNames = (
  props: { sectionName: string; assessment: Assessment },
  client: BaseProtocol = DB
): Promise<Array<string>> => {
  const { sectionName, assessment } = props
  const schema = Schemas.getName(assessment)

  return client.map<string>(
    `
        select t.props ->> 'name' as name
        from ${schema}.table_section ts
        left join ${schema}.table t
        on ts.id = t.table_section_id
        left join ${schema}.section s
        on s.id = ts.section_id
        where s.props ->> 'name' = $1
    `,
    [sectionName],
    ({ name }) => name
  )
}
