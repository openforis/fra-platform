import { Promises } from 'utils/promises'
import { validateAll } from 'tools/validations/validateAll'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// The shape of link locations changed with the national data point links validation,
// so we clear all of them and let the link verification jobs rebuild them.
const _resetLinkLocations = async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      await client.query(`
        update ${schemaCycle}.link
        set locations = '[]'::jsonb
        where locations is distinct from '[]'::jsonb
      `)
    })
  })
}

export default async (client: BaseProtocol): Promise<void> => {
  await _resetLinkLocations(client)
  await CacheController.generateMetaCache({}, client)
  await validateAll(client)
}
