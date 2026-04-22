import { Promises } from 'utils/promises'

import { TableRedisRepository } from 'server/cache/repository/table'
import { ValidationRedisRepository } from 'server/cache/repository/validation'
import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { computeTableValidations } from 'server/controller/cycleData/validations/compute/computeTableValidations'
import { BaseProtocol, DB } from 'server/db/db'

export const backfillTableValidations = async (client: BaseProtocol = DB): Promise<void> => {
  const assessments = await AssessmentController.getAll({ metaCache: true }, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const [countries, tables] = await Promise.all([
        AreaController.getCountries({ assessment, cycle }, client),
        TableRedisRepository.getManyRecord({ assessment, cycle }),
      ])

      const tableNames = Object.keys(tables)

      await Promises.each(countries, async (country) => {
        const tableValidations = await computeTableValidations({
          assessment,
          country,
          cycle,
          tables,
        })

        await ValidationRedisRepository.setTableValidations({
          assessment,
          countryIso: country.countryIso,
          cycle,
          tableNames,
          tableValidations,
        })
      })
    })
  })
}
