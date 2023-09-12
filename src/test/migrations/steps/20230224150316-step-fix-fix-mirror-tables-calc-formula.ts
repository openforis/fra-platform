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
              '{calculateFn,"${cycle.uuid}"}',
              to_jsonb(d.formula)
          )
      from (select r.id,
                   r.props,
                   r.props ->> 'variableName',
                   r.props -> 'calculateFn' ->> '${cycle.uuid}',
                   concat(
                           '(',
                           substr(t.props ->> 'name', 1, length(t.props ->> 'name') - 3),
                           'Total.',
                           r.props ->> 'variableName',
                           ' / extentOfForest.forestArea ) * 1000'
                       )                                                                as formula,
                   '(' || substr(t.props ->> 'name', 1, length(t.props ->> 'name') - 3) as a
            from ${schemaAssessment}.row r
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' in ('carbonStockAvg', 'biomassStockAvg')
              and r.props ->> 'variableName' is not null) as d
      where d.id = r.id
  `)
}
