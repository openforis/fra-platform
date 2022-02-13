import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Cycle, TableSection } from '@meta/assessment'

export const getSectionMetaData = async (
  props: {
    assessment: Assessment
    section: string
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<Array<TableSection>> => {
  const { cycle, section, assessment } = props
  const schemaName = Schemas.getName(assessment)

  return client.oneOrNone<Array<TableSection>>(
    `
        with ts as (
            select ts.*
            from ${schemaName}.table_section ts
                     left join ${schemaName}.section s on ts.section_id = s.id
            where s.props ->> 'name' = $1
              and s.props -> 'cycles' ? $2
              and ts.props -> 'cycles' ? $2

        ),
             t as (
                 select t.*
                 from ${schemaName}."table" t,
                      ts
                 where t.table_section_id = ts.id and ts.props -> 'cycles' ? $2 and t.props -> 'cycles' ? $2
             ),
             rows as (
                 select r.*, jsonb_agg(c.* order by c.id) as cols
                 from ${schemaName}.col c
                          left join ${schemaName}.row r on r.id = c.row_id
                 where r.table_id in (select t.id from t) and r.props -> 'cycles' ? $2 and c.props -> 'cycles' ? $2

                 group by r.id
             ),
             tables as (
                 select t.*, jsonb_agg(r.* order by r.id) as rows
                 from "rows" r
                          left join t on t.id = r.table_id
                 group by t.id, t.uuid, t.props, t.table_section_id
             )
        select ts.*,
               jsonb_agg(t.* order by t.id) as tables
        from "tables" t
                 left join ts on t.table_section_id = ts.id
        group by ts.id, ts.uuid, ts.props, ts.section_id;

      `,
    [section, cycle.uuid],
    Objects.camelize
  )
}
