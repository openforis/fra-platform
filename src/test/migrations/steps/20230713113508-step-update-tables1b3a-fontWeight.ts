import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.col c
      set props = jsonb_set(c.props, '{style,${cycle.uuid},fontWeight}', to_jsonb(600), true)
      from (select c.id
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on c.row_id = r.id
                     left join ${schemaAssessment}."table" t on r.table_id = t.id
            where t.props ->> 'name' = 'forestCharacteristics'
              and r.props ->> 'variableName' = 'naturalForestArea'
              and c.props ->> 'index' = 'header_0') as cSource
      where c.id = cSource.id;

      update ${schemaAssessment}.col c
      set props = jsonb_set(c.props, '{style,${cycle.uuid},fontWeight}', to_jsonb(400), true)
      from (select c.id
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on c.row_id = r.id
                     left join ${schemaAssessment}."table" t on r.table_id = t.id
            where t.props ->> 'name' = 'primaryDesignatedManagementObjective'
              and r.props ->> 'variableName' = 'unknown'
              and c.props ->> 'index' = 'header_0') as cSource
      where c.id = cSource.id;

  `)
}
