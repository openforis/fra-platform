import { Objects } from '@core/utils'

import { Assessment, Cycle, TableSection } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getSectionMetaData = async (
  props: {
    assessment: Assessment
    sectionNames: Array<string>
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<Array<TableSection>> => {
  const { cycle, sectionNames, assessment } = props
  const schemaName = Schemas.getName(assessment)

  // TODO: This query should be optimized to return Record<[sectionName], Array<TableSection>>

  return client.map<TableSection>(
    `
        with ts as (
            select ts.*, s.props -> 'name' as section_name
            from ${schemaName}.table_section ts
                     left join ${schemaName}.section s on ts.section_id = s.id
            where s.props ->> 'name' in ($1:list)
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
                 select r.*, jsonb_agg(c.* order by c.id)  filter ( where c.props -> 'cycles' ? $2 ) as cols
                 from ${schemaName}.col c
                          left join ${schemaName}.row r on r.id = c.row_id
                 where r.table_id in (select t.id from t) and r.props -> 'cycles' ? $2
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
        group by ts.id, ts.uuid, ts.props, ts.section_id, ts.section_name;

      `,
    [sectionNames, cycle.uuid],
    (ts: TableSection) => {
      const { tables, ...tableSection } = ts
      return {
        ...tableSection,
        // @ts-ignore
        sectionName: ts.section_name,
        tables: tables.map(({ props, ...table }) => ({ ...Objects.camelize(table), props })),
      }
    }
  )
}
