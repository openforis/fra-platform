import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)
  const schemaAssessment = Schemas.getName(assessment)

  await client.query(
    assessment.cycles.map(
      (cycle) =>
        `
            update ${schemaAssessment}.col c
            set props = jsonb_set(c.props, '{style,${cycle.uuid},fontWeight}', to_jsonb(400), true)
            from (select c.id
                  from ${schemaAssessment}.col c
                           left join ${schemaAssessment}.row r on c.row_id = r.id
                           left join ${schemaAssessment}."table" t on r.table_id = t.id
                  where t.props ->> 'name' = 'holderOfManagementRights'
                    and r.props ->> 'variableName' = '${cycle.name === '2020' ? 'other' : 'unknown'}' 
                    and c.props ->> 'index' = 'header_0') as cSource
            where c.id = cSource.id
        `
    ).join(`;
  `)
  )
}
