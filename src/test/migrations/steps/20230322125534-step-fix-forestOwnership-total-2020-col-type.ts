import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)
  const schemaName = Schemas.getName(assessment)

  const query = `
    update ${schemaName}.col c
    set props = jsonb_set(props, '{colType}', '"calculated"')
    where c.props ->> 'colName' = '2020'
      and c.id in (select c.id from ${schemaName}.table t
                                        left join ${schemaName}.row r on r.table_id = t.id
                                        left join ${schemaName}.col c on r.id = c.row_id
                   where
                               r.props ->> 'variableName' = 'total' and t.props ->> 'name' = 'forestOwnership'
                     and r.table_id = t.id
                     and c.props ->> 'colName' = '2020')
      `
  await client.query(query)
}
