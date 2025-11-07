import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const client = DB

export default async (): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.none(`alter table ${schemaCycle}.country drop column if exists country_iso2;`)
      await client.none(`alter table ${schemaCycle}.country drop column if exists calling_code;`)
    })
  })
}
