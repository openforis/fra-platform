import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Numbers } from 'utils/numbers'

import { AreaController } from 'server/controller/area'
import { CycleDataController } from 'server/controller/cycleData'
import { BaseProtocol, DB } from 'server/db/db'

type Props = { assessment: Assessment; countryIso: CountryIso }

export const _getLastPublishedFra1aForestArea = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<number | null> => {
  const { assessment, countryIso } = props
  const { name: assessmentName } = assessment.props

  // Same logic as Explorer: country-specific last published cycle.
  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  if (!lastPublishedCycle) return null
  const lastPublishedCycleName = lastPublishedCycle.name

  const country = await AreaController.getCountry({ assessment, cycle: lastPublishedCycle, countryIso }, client)
  const countryLastPublishedCycleName = country.lastPublishedInfo?.cycleName
  if (!countryLastPublishedCycleName) return null

  const variableName = 'forestArea'
  const tableName = TableNames.extentOfForest

  const data = await CycleDataController.getLastPublishedData(
    {
      assessment,
      columns: [countryLastPublishedCycleName],
      countryISOs: [countryIso],
      tableNames: [tableName],
      variables: [variableName],
    },
    client
  )

  const rawValue =
    RecordAssessmentDatas.getDatum({
      assessmentName,
      colName: countryLastPublishedCycleName,
      countryIso,
      cycleName: lastPublishedCycleName,
      data,
      tableName,
      variableName,
    }) ?? ''
  const parsed = Numbers.toBigNumber(rawValue)

  return parsed.isFinite() ? parsed.toNumber() : null
}
