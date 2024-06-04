import { TableNames } from 'meta/assessment'

export const CustomDataView: Record<
  string,
  (schemaCycle: string, schemaAssessment: string, tableName: string) => string
> = {
  [TableNames.extentOfForest]: (schemaCycle: string, schemaAssessment: string, tableName: string) => `
      create or replace view ${schemaCycle}.${tableName} as
        with eof as (select n.country_iso,
               r.props ->> 'variableName' as variable_name,
               c.props ->> 'colName'      as col_name,
               n.value
        from ${schemaCycle}.node n
                 left join ${schemaAssessment}.row r on r.uuid = n.row_uuid
                 left join ${schemaAssessment}.col c on c.uuid = n.col_uuid
                 left join ${schemaAssessment}."table" t on t.id = r.table_id
        where t.props ->> 'name' = '${tableName}'
          and r.props ->> 'type' in ('data', 'calculated'))
        select * from eof
        union all
        select ne.country_iso,
               ne.props ->> 'variableName' as variable_name,
               ne.props ->> 'colName'      as col_name,
               ne.value
        from ${schemaCycle}.node_ext ne
        where type = 'node'
          and ne.props ->> 'variableName' = 'totalLandArea'
          and ne.props ->> 'tableName' = 'extentOfForest'
          and exists (select 1 from eof where eof.col_name = ne.props ->> 'colName')`,
}
