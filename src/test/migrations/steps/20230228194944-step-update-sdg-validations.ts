import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.row r
      set props = jsonb_set(
              r.props,
              '{validateFns}',
              jsonb_build_object('${cycle.uuid}', d.formula),
              true
          )
      from (select r.id,
                   r.props ->> 'variableName' as variable_name,
                   t.props ->> 'name'         as table_name,
                   jsonb_build_array(concat(
                           'validatorNotGreaterThan(',
                           t.props ->> 'name',
                           '.',
                           r.props ->> 'variableName',
                           ','
                               '''100''',
                           ')'
                       ))                     as formula
            from ${schemaAssessment}.row r
                     left outer join
                 ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' in
                  ('sustainableDevelopment15_1_1', 'sustainableDevelopment15_2_1_1', 'sustainableDevelopment15_2_1_3',
                   'sustainableDevelopment15_2_1_4')
              and r.props ->> 'variableName' is not null) as d
      where d.id = r.id
  `)
}
