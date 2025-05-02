import { Promises } from 'utils/promises'

import { CountryStatus } from 'meta/area'
import { CycleStatus } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      if (cycle.props.status === CycleStatus.published) {
        await client.query(`update ${schemaName}.country set status = $1`, [CountryStatus.published])
      }

      await DB.query(`alter table ${schemaName}.country add column last_in_published timestamptz;`)
      await CacheController.generateArea({ assessment, cycle }, client)
    })
  })
}
