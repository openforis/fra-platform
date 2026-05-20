import { Promises } from 'utils/promises'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({})
  const allCycles = assessments.flatMap((assessment) => assessment.cycles.map((cycle) => ({ assessment, cycle })))

  await client.none(`
      update public.country c
       set m49 = 159
     where country_iso = 'CHN'`)

  await Promises.each(allCycles, async ({ assessment, cycle }) => {
    await CacheController.generateArea({ assessment, cycle })
  })
}
