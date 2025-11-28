import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { TableSection } from 'meta/assessment/tableSection'

import { BaseProtocol, DB } from 'server/db/db'
import { TableSectionAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionNames?: Array<SectionName>
  showHidden?: boolean
}

type RecordTableSections = Record<SectionName, Array<TableSection>>

export const getManyMetadata = async (props: Props, client: BaseProtocol = DB): Promise<RecordTableSections> => {
  const { assessment, cycle, sectionNames, showHidden = false } = props
  const schemaName = Schemas.getName(assessment)

  // @ts-ignore
  return client.result<RecordTableSections>(
    `
        with "row" as (select s.props ->> 'name' as section_name,
                              to_jsonb(ts.*)     as table_section,
                              to_jsonb(t.*)      as "table",
                              jsonb_set(
                                      to_jsonb(r.*),
                                      '{"cols"}',
                                      jsonb_agg(c.* order by c.id)
                                  )              as row
                       from ${schemaName}.col c
                                left join ${schemaName}.row r on r.uuid = c.row_uuid
                                left join ${schemaName}."table" t on t.uuid = r.table_uuid
                                left join ${schemaName}.table_section ts on ts.uuid = t.table_section_uuid
                                left join ${schemaName}.section s on ts.section_uuid = s.uuid
                       where ts.props -> 'cycles' ? $2
                         and t.props -> 'cycles' ? $2
                         and r.props -> 'cycles' ? $2
                         and c.props -> 'cycles' ? $2
                         and ($3 = true or (coalesce(s.props -> 'hidden' ->> '${
                           cycle.uuid
                         }', 'false')::boolean = false and $3 = false))
                           ${sectionNames?.length ? `and s.props ->> 'name' in ($1:list)` : ''}
                       group by s.props ->> 'name',
                                to_jsonb(ts.*),
                                to_jsonb(t.*),
                                to_jsonb(r.*),
                                t.props),
             "table" as (select r.section_name,
                                r.table_section,
                                jsonb_set(
                                        r."table",
                                        '{"rows"}',
                                        jsonb_agg(r.row order by (r.row ->> 'id')::numeric)
                                    ) as "table"
                         from row r
                         group by r.section_name, r.table_section, r."table"),
             table_section as (select t.section_name,
                                      jsonb_set(
                                              t.table_section,
                                              '{"tables"}',
                                              jsonb_agg(t."table" order by (t."table" ->> 'id')::numeric)
                                          ) as table_section
                               from "table" t
                               group by t.section_name, t.table_section),
             section as (select ts.section_name, jsonb_agg(ts.table_section) as table_sections
                         from table_section ts
                         group by ts.section_name)
        select *
        from section s
        ;

    `,
    [sectionNames, cycle.uuid, showHidden],
    // @ts-ignore
    (result) => {
      return result.rows.reduce((prev, current) => {
        // @ts-ignore
        return {
          ...prev,
          // @ts-ignore
          [current.section_name]: current.table_sections.map(TableSectionAdapter),
        }
      }, {})
    }
  )
}
