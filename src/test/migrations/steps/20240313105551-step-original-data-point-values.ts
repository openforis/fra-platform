import { Promises } from 'utils/promises'

import { Assessment, Cycle, ODPs } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

const _updateDDL = async ({ assessment, cycle }: { assessment: Assessment; cycle: Cycle }) => {
  const schemaName = Schemas.getNameCycle(assessment, cycle)
  Logger.debug('Updating original data point values column for schema', schemaName)
  await client.none(`
    alter table ${schemaName}.original_data_point
    add column if not exists values jsonb default '{}'::jsonb;
  `)
}
export default async () => {
  const assessmentName = 'fra'
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  await Promises.each(assessment.cycles, async (cycle) => {
    await _updateDDL({ assessment, cycle })
    await client.tx(async (tx) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, tx)
      await Promises.each(countries, async (country) => {
        const { countryIso } = country
        const getODPsProps = { assessment, cycle, countryIso }
        const originalDataPoints = await CycleDataController.getOriginalDataPoints(getODPsProps, tx)
        const withValues = originalDataPoints.map(ODPs.calculateValues)
        await Promises.each(withValues, async (odp) => {
          const updateODProps = { assessment, cycle, originalDataPoint: odp }
          const debugProps = `${assessment.props.name}-${cycle.name}-${odp.countryIso}-${odp.year}`
          Logger.debug(`Updating original data point${debugProps}`)
          await OriginalDataPointRepository.updateOriginalData(updateODProps, tx)
        })
      })
    })
  })
}
