import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)
      const q = `
          update ${schemaName}.repository
          set props = props || '{"public": true}'::jsonb
          where uuid in
              (select regexp_replace(value ->> 'text', '.*file/(.*?)\\?.*', '\\1')::uuid
              from ${schemaName}.descriptions where value ->> 'text' ilike '%cycle-data/repository/file%')
      `

      await client.query(q)
    })
  })
}
