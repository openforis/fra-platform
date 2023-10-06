import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName: 'fra',
    cycleName: '2025',
  })

  const schemaName = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(`
      update ${schemaCycle}.node n
      set value = jsonb_set(value, '{calculated}', 'true'::jsonb)
      from ${schemaName}.table t
               left join ${schemaName}.row r on t.id = r.table_id
               left join ${schemaName}.col c on r.id = c.row_id
      where t.props ->> 'name' = 'primaryForestByClimaticDomain'
        and r.props ->> 'variableName' = 'totalPrimaryForest'
        and c.props ->> 'colType' = 'calculated'
        and n.row_uuid = r.uuid
        and n.col_uuid = c.uuid
        and n.value ->> 'calculated' is null
  `)
}
