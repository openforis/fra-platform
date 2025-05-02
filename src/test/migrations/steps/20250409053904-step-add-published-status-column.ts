import { Promises } from 'utils/promises'

import { CycleStatus } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { UserController } from 'server/controller/user'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const user = await UserController.getOne({ email: 'fra@fao.org' })
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)

      if (cycle.props.status === CycleStatus.published) {
        await AssessmentController.publishCycle({ assessment, cycle, allCountries: true, user })
      }

      await DB.query(`alter table ${schemaName}.country add column last_in_published timestamptz;`)
      await CacheController.generateArea({ assessment, cycle }, client)
    })
  })
}
