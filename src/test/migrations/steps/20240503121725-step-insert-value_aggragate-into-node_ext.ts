import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

/**
 * 1. Insert value_aggregate into node_ext
 * 2. Drop value_aggregate
 * Note: We don't migrate values that are not associated with a table,
 * eg. precalculated ratios or sums or totals
 */

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getName(assessment)
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      const q = `
          insert into ${schemaCycle}.node_ext (country_iso, type, props, value)
          select va.country_iso
               , 'node' as type
               , jsonb_build_object(
                  'colName', va.col_name,
                  'tableName', t.props ->> 'name',
                  'variableName', va.variable_name
                 )      as props
               , va.value
          from ${schemaCycle}.value_aggregate va
                   left join ${schemaName}.row on va.variable_name = row.props ->> 'variableName'
              left join ${schemaName}.table t on row.table_id = t.id
          where t.props ->> 'name' is not null
      `
      await client.query(q)
      await client.query(`drop table ${schemaCycle}.value_aggregate`)
    })
  })
}
