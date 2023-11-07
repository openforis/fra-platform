import { Promises } from 'utils/promises'

import { TableNames } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { getOriginalDataPointVariables } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { BaseProtocol, Schemas } from 'server/db'
import { getCreateSchemaCycleOriginalDataPointViewDDL } from 'server/repository/assessment/assessment/getCreateSchemaDDL'
import { DataRedisRepository } from 'server/repository/redis/data'

import { updateCalculatedVariable } from 'test/migrations/steps/utils/updateCalculatedVariable'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)

  // // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < assessment.cycles.length; i += 1) {
    const cycle = assessment.cycles[i]
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const odpViewQuery = getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle)
    // eslint-disable-next-line no-await-in-loop
    await client.query(odpViewQuery)

    // eslint-disable-next-line no-await-in-loop
    const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)

    // eslint-disable-next-line no-await-in-loop
    const tables = {
      [TableNames.originalDataPointValue]: {},
    }
    const getCountriesDataProps = { assessment, cycle, countryISOs, tables, force: true }
    // eslint-disable-next-line no-await-in-loop
    await DataRedisRepository.getCountriesData(getCountriesDataProps, client)

    const originalDataPointVariables = getOriginalDataPointVariables({ cycle })
    // eslint-disable-next-line no-await-in-loop
    await Promises.each(originalDataPointVariables, async (variable) => {
      // eslint-disable-next-line no-await-in-loop
      const updateVariablesProps = { assessment, cycle, ...variable }
      await updateCalculatedVariable(updateVariablesProps, client)
    })
  }
}
