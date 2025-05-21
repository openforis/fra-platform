import { CountryIso, CountryStatus } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, Schemas } from 'server/db'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'

const assessmentName = 'fra'
const cycleName = '2020'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  // [X01..X20]
  const atlantisCountries = Array.from(
    { length: 20 },
    (_, i) => `X${(i + 1).toString().padStart(2, '0')}` as CountryIso
  )

  await Promise.all(
    atlantisCountries.map(async (countryIso) => {
      await CountryActivityLogRepository.dropMaterializedView({ assessment, cycle, countryIso }, client)
      await CountryActivityLogRepository.createMaterializedView({ assessment, cycle, countryIso }, client)
    })
  )

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  await client.query(`update ${schemaName}.country set status = $1 where status is null and country_iso like 'X%'`, [
    CountryStatus.accepted,
  ])

  await CacheController.generateArea({ assessment, cycle }, client)
}
