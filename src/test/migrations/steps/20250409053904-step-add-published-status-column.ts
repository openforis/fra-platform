import { Promises } from 'utils/promises'

import { CountryStatus } from 'meta/area'
import { CycleStatus } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  // 1. Add the column to all schemas
  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)
      await DB.query(`alter table ${schemaName}.country add column last_in_published timestamptz;`)
    })
  })

  // 2. Update data
  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      if (cycle.props.status === CycleStatus.published) {
        const schemaName = Schemas.getNameCycle(assessment, cycle)
        await client.query(
          `
          update ${schemaName}.country
          set last_in_published = $1,
              status = $2
        `,
          [cycle.props.datePublished, CountryStatus.published]
        )
      }
    })
  })

  // 3. Generate cache for each cycle
  // N.B. When populating cache, we expect _all assessment cycle schemas_ to have above column
  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      await CacheController.generateArea({ assessment, cycle }, client)
    })
  })
}
