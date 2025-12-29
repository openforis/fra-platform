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
  const country = await AreaController.getCountry({ assessment, cycle: lastPublishedCycle, countryIso }, client)

  const { cycleName } = country?.lastPublishedInfo ?? {}
  if (!cycleName) return null

  const cycle = Assessments.getCycle({ assessment, cycleName })
  const excludeOdpTable = true
  const mergeOdp = true
  const variables = ['forestArea']
  const tableNames = [TableNames.extentOfForest]

  const params = { assessment, cycle, countryISOs: [countryIso], excludeOdpTable, mergeOdp, tableNames, variables }
  const data = await CycleDataController.getTableData(params, client)

  const tableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    countryIso,
    cycleName,
    data,
    tableName: tableNames[0],
  })

  const lastYear = Object.keys(tableData)
    .reduce((years, colName) => {
      const year = Number.parseInt(colName, 10)
      if (Number.isFinite(year)) years.push(year)
      return years
    }, [])
    .sort((a, b) => a - b)
    .at(-1)

  if (!lastYear) return null

  const nodeValue = tableData[String(lastYear)]?.forestArea
  const rawValue = nodeValue?.raw ?? ''
  const parsed = Numbers.toBigNumber(rawValue)

  return parsed.isFinite() ? parsed.toNumber() : null
}
