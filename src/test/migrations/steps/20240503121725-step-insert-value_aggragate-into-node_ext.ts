import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

/**
 * 1a. Insert value_aggregate into node_ext for fra 2020
 * 1b. Insert value_aggregate.totalLandArea into node_ext for fra 2025
 * 2. Drop value_aggregate
 * Note: We don't migrate values that are not associated with a table,
 *       eg. precalculated ratios or sums or totals
 * Note: We don't migrate values that are already in node_ext
 */

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)
  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaName = Schemas.getName(assessment)
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const where = assessmentName === 'fra' && cycleName === '2025' ? `and va.variable_name = 'totalLandArea'` : ''
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
          where t.props ->> 'name' is not null ${where}
            and not exists (
              select 1
                from assessment_fra_2025.node_ext ne
                  where ne.props ->> 'variableName' = va.variable_name
                and ne.country_iso = va.country_iso
                and ne.props ->> 'colName' = va.col_name
                and ne.value = va.value
              )
      `
    await client.query(q)
    await client.query(`drop table ${schemaCycle}.value_aggregate`)
  })
}
