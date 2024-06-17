import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaAssessment = Schemas.getName(assessment)
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      await client.none(`
          delete
          from ${schemaCycle}.node
          where row_uuid in (select r.uuid
                             from ${schemaCycle}.node n
                                      left join ${schemaAssessment}.row r on r.uuid = n.row_uuid
                             where r.props ->> 'variableName' = 'totalLandArea')
      `)
    })
  })
}
