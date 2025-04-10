import { Promises } from 'utils/promises'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { DB, Schemas } from 'server/db'
import { AreaRedisRepository } from 'server/repository/redis/area'

type SchemaValues = Array<{ schemaName: string; assessment: Assessment; cycle: Cycle }>

export default async () => {
  const assessments = await AssessmentController.getAll({ metaCache: true })

  const schemaValues: SchemaValues = assessments.flatMap((assessment) =>
    assessment.cycles.map((cycle) => ({
      schemaName: Schemas.getNameCycle(assessment, cycle),
      assessment,
      cycle,
    }))
  )

  await Promises.each(schemaValues, async ({ schemaName }) => {
    await DB.query(`alter table ${schemaName}.country add column last_in_published timestamptz;`)
  })

  await Promises.each(schemaValues, async ({ assessment, cycle }) => {
    await AreaRedisRepository.getCountriesMap({ assessment, cycle, force: true })
  })
}
