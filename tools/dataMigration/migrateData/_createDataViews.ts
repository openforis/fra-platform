import { Assessment } from '../../../src/meta/assessment/assessment'
import { Col } from '../../../src/meta/assessment/col'
import { Cycle } from '../../../src/meta/assessment/cycle'
import { Table, TableNames } from '../../../src/meta/assessment/table'
import { BaseProtocol, Tables } from '../../../src/server/db'
import { DBNames } from '../_DBNames'
import { getCols } from './_repos'

const getColLinkedNodeUnion = (props: { col: Col & { variableName?: string }; cycle: Cycle }): string => {
  const { col, cycle } = props
  const { assessmentName, cycleName, tableName, variableName, colName } = col.props.linkedNodes[cycle.uuid]

  const viewName = [TableNames.extentOfForest, TableNames.forestCharacteristics].includes(tableName as TableNames)
    ? Tables.getTableDataWithOdpViewName({ tableName })
    : tableName

  return `
    union
    select e.country_iso
     , '${col.variableName}'      as variable_name
     , '${col.props.colName}'     as col_name
     , e.value
    from ${DBNames.getCycleSchema(assessmentName, cycleName)}.${viewName} e
    where e.col_name = '${colName}'
      and e.variable_name = '${variableName}'
  `
}

export const getCreateViewDDL = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    table: Table
  },
  client: BaseProtocol
): Promise<string> => {
  const { assessment, cycle, table } = props

  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, cycle.name)

  const cols = await getCols(client, schema, table)
  const colsLinkedNodes = cols.filter((col) => Boolean(col.props.linkedNodes?.[cycle.uuid]))

  const query = `
  create or replace view ${schemaCycle}.${table.props.name} as
  (
  select n.country_iso,
         r.props ->> 'variableName' as variable_name,
         c.props ->> 'colName'      as col_name,
         n.value
  from ${schemaCycle}.node n
           left join ${schema}.row r
                     on r.uuid = n.row_uuid
           left join ${schema}.col c
                     on c.uuid = n.col_uuid
           left join ${schema}."table" t
                     on t.id = r.table_id
           where t.props ->> 'name' = '${table.props.name}'
             and r.props ->> 'type' in ('data', 'calculated')
             -- ======= exclude linked node from view generation
             and c.props -> 'linkedNodes' -> '${cycle.uuid}' is null
  ${
    colsLinkedNodes.length
      ? `${colsLinkedNodes.map((col) => getColLinkedNodeUnion({ col, cycle })).join(`
  `)}`
      : ''
  }             
           order by 1, 2, 3
           
    );
  `

  return query
}
