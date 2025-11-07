import { TableNames } from 'meta/assessment/table'

export const getTotalLandArea = (schema: string): string => {
  return `select country_iso,
          r.props ->> 'variableName' as variable_name,
          r.props ->> 'tableName'    as table_name,
          r.props ->> 'colName'      as col_name,
          r.value ->> 'raw'          as value
   from ${schema}.node_ext r
   where type = 'node'
     and r.props ->> 'variableName' = 'totalLandArea'
     and r.props ->> 'tableName' = '${TableNames.extentOfForest}'`
}
