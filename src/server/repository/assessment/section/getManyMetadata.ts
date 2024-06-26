import { Assessment, Cycle, TableSection } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { TableSectionAdapter } from 'server/repository/adapter'

export const getManyMetadata = async (
  props: {
    assessment: Assessment
    sectionNames?: Array<string>
    cycle: Cycle
    showHidden?: boolean
  },
  client: BaseProtocol = DB
): Promise<Record<string, Array<TableSection>>> => {
  const { cycle, sectionNames, assessment, showHidden = false } = props
  const schemaName = Schemas.getName(assessment)

  return client.result<Record<string, Array<TableSection>>>(
    `
        with "row" as (select s.props ->> 'name' as section_name,
                              to_jsonb(ts.*)     as table_section,
                              to_jsonb(t.*)
                                  ||
                              jsonb_build_object(
                                      'validationDependencies',
                                      jsonb_extract_path(
                                              a.meta_cache,
                                              '${cycle.uuid}',
                                              'validations',
                                              'dependencies', t.props ->> 'name'
                                          )
                                  ) 
                                  ||
                              jsonb_build_object(
                                      'calculationDependencies',
                                      jsonb_extract_path(
                                              a.meta_cache,
                                              '${cycle.uuid}',
                                              'calculations',
                                              'dependencies', t.props ->> 'name'
                                          )
                                  )  as "table",
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
                                left join public.assessment a on a.uuid = '${assessment.uuid}'
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
                                t.props,
                                a.meta_cache),
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
    (result) => {
      return result.rows.reduce((prev, current) => {
        return {
          ...prev,
          [current.section_name]: current.table_sections.map(TableSectionAdapter),
        }
      }, {})
    }
  )
}
