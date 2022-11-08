import { Objects } from '@utils/objects'

import { Assessment, Cycle, TableSection } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getManyMetadata = async (
  props: {
    assessment: Assessment
    sectionNames: Array<string>
    cycle: Cycle
  },
  client: BaseProtocol = DB
): Promise<Record<string, Array<TableSection>>> => {
  const { cycle, sectionNames, assessment } = props
  const schemaName = Schemas.getName(assessment)

  return client.result<Record<string, Array<TableSection>>>(
    `
        with "row" as (
            select s.props ->> 'name' as section_name,
                   to_jsonb(ts.*)     as table_section,
                   to_jsonb(t.*)      as "table",
                   jsonb_set(
                           to_jsonb(r.*),
                           '{"cols"}',
                           jsonb_agg(c.* order by c.id)
                       )              as row
            from ${schemaName}.col c
                     left join ${schemaName}.row r on r.id = c.row_id
                     left join ${schemaName}."table" t on t.id = r.table_id
                     left join ${schemaName}.table_section ts on ts.id = t.table_section_id
                     left join ${schemaName}.section s on ts.section_id = s.id
                     where s.props ->> 'name' in ($1:list)
                           and ts.props -> 'cycles' ? $2
                           and t.props -> 'cycles' ? $2
                           and r.props -> 'cycles' ? $2
                           and c.props -> 'cycles' ? $2
            group by s.props ->> 'name', to_jsonb(ts.*), to_jsonb(t.*), to_jsonb(r.*)
        ),
             "table" as (
                 select r.section_name,
                        r.table_section,
                        jsonb_set(
                                r."table",
                                '{"rows"}',
                                jsonb_agg(r.row order by (r.row ->> 'id')::numeric)
                            ) as "table"
                 from row r
                 group by r.section_name, r.table_section, r."table"
             ),
             table_section as (
                 select t.section_name,
                        jsonb_set(
                                t.table_section,
                                '{"tables"}',
                                jsonb_agg(t."table" order by (t."table" ->> 'id')::numeric)
                            ) as table_section
                 from "table" t
                 group by t.section_name, t.table_section
             ),
             section as (
                 select ts.section_name, jsonb_agg(ts.table_section) as table_sections
                 from table_section ts
                 group by ts.section_name
             )
        select *
        from section s
        ;

      `,
    [sectionNames, cycle.uuid],
    (result) => {
      return result.rows.reduce((prev, current) => {
        return {
          ...prev,
          [current.section_name]: current.table_sections.map((ts: TableSection) => {
            const { tables, ...tableSection } = ts
            return {
              ...tableSection,
              tables: tables.map(({ props, rows, ...table }) => ({
                ...Objects.camelize(table),
                props,
                rows: rows.map(({ cols, ...row }) => ({
                  ...Objects.camelize(row),
                  props: {
                    ...Objects.camelize(row.props),
                    calculateFn: row.props.calculateFn,
                    validateFns: row.props.validateFns,
                  },
                  cols: cols.map(({ props: { labels, style, variableNo, ...otherProps }, ...col }) => ({
                    ...Objects.camelize(col),
                    props: { ...Objects.camelize(otherProps), labels, style, variableNo },
                  })),
                })),
              })),
            }
          }),
        }
      }, {})
    }
  )
}
