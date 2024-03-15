import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { Country } from 'meta/area'
import { Assessment, Cycle, ODPs, OriginalDataPoint } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

const client: BaseProtocol = DB

const _getTLA = async (
  props: { originalDataPoint: OriginalDataPoint; assessment: Assessment; cycle: Cycle; country: Country },
  tx: BaseProtocol
) => {
  const { assessment, cycle, originalDataPoint } = props
  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const totalLandArea = await tx.one(
    `
        select
            r.value ->> 'raw' as value
        from ${schemaName}.node_ext r
        where type = 'node' and r.props ->> 'variableName' = 'totalLandArea' and r.props ->> 'tableName' = 'extentOfForest'
        and r.props ->> 'colName' = '$1' and r.country_iso = $2
   `,
    [originalDataPoint.year, originalDataPoint.countryIso]
  )

  return Objects.setInPath({ obj: originalDataPoint, path: ['values', 'totalLandArea'], value: totalLandArea.value })
}

const _updateDDL = async ({ assessment, cycle }: { assessment: Assessment; cycle: Cycle }) => {
  const schemaName = Schemas.getNameCycle(assessment, cycle)
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
        const withTotalLandArea = await Promise.all(
          originalDataPoints.map((originalDataPoint) => _getTLA({ originalDataPoint, assessment, cycle, country }, tx))
        )

        const withValues = withTotalLandArea.map(ODPs.calculateValues)
        await Promises.each(withValues, async (odp) => {
          const updateODProps = { assessment, cycle, originalDataPoint: odp }
          await OriginalDataPointRepository.updateOriginalData(updateODProps, tx)
        })
      })
    })
  })
}
