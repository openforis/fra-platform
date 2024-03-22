import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

// Update message topic data rows key:
// source: {uuid}
// target: dataRow_{uuid}
export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const schemaAssessment = Schemas.getName(assessment)
      await client.none(`
          update ${schemaCycle}.message_topic
          set key = 'dataRow_' || key
          where key in (select uuid:: varchar from ${schemaAssessment}.row)
      `)
    })
  })
}
