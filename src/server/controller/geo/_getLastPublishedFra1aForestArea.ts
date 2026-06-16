import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Numbers } from 'utils/numbers'

import { TableDataController } from 'server/controller/cycleData/tableData'
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

  const variableName = 'forestArea'
  const tableName = TableNames.extentOfForest

  const data = await TableDataController.getLastPublishedData(
    {
      assessment,
      columns: [lastPublishedCycleName],
      countryISOs: [countryIso],
      tableNames: [tableName],
      variables: [variableName],
    },
    client
  )

  const rawValue =
    RecordAssessmentDatas.getDatum({
      assessmentName,
      colName: lastPublishedCycleName,
      countryIso,
      cycleName: lastPublishedCycleName,
      data,
      tableName,
      variableName,
    }) ?? ''
  const parsed = Numbers.toBigNumber(rawValue)

  return parsed.isFinite() ? parsed.toNumber() : null
}
