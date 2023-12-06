import { Promises } from 'utils/promises'

import { TableNames } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { getCreateSchemaCycleOriginalDataPointViewDDL } from 'server/repository/assessment/assessment/getCreateSchemaDDL'
import { DataRedisRepository } from 'server/repository/redis/data'

import { updateODPDependencies } from 'test/migrations/steps/utils/updateODPDependencies'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)

  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const odpViewQuery = getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle)
    await client.query(odpViewQuery)
    const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)

    const tables = { [TableNames.originalDataPointValue]: {} }
    const getCountriesDataProps = { assessment, cycle, countryISOs, tables, force: true }
    await DataRedisRepository.getCountriesData(getCountriesDataProps, client)

    await updateODPDependencies({ assessment, cycle }, client)
  })
}
