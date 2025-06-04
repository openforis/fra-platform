import { CountryStatus } from 'meta/area'
import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName: AssessmentNames.fra,
    cycleName: 'latest',
  })
  const schemaName = Schemas.getNameCycle(assessment, cycle)

  await client.query(`update ${schemaName}.country set status = $1 where status = $2 and country_iso not like 'X%'`, [
    CountryStatus.review,
    CountryStatus.notStarted,
  ])

  await CacheController.generateArea({ assessment, cycle }, client)
}
