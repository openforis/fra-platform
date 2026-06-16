import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { AreaController } from 'server/controller/area'
import { getData } from 'server/controller/cycleData/tableData/getData'
import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  columns?: Array<string>
  countryISOs: Array<CountryIso>
  tableNames: Array<string>
  variables?: Array<string>
}

export const getLastPublishedData = async (props: Props, client: BaseProtocol = DB): Promise<RecordAssessmentData> => {
  const { assessment, columns, countryISOs, tableNames, variables } = props
  const { name: assessmentName } = assessment.props

  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  const countriesMap = await AreaController.getCountriesMap({ assessment, cycle: lastPublishedCycle }, client)
  const publishedCycleName = lastPublishedCycle.name
  const excludeOdpTable = true
  const mergeOdp = true

  // Build a record of cycleName->countryISOs, where cycleName is lastPublished cycle for the given countries.
  const cycleCountries = countryISOs.reduce<Record<CycleName, Array<CountryIso>>>((acc, countryIso) => {
    const country = countriesMap[countryIso]
    const { cycleName } = country.lastPublishedInfo

    if (!acc[cycleName]) acc[cycleName] = []
    acc[cycleName].push(countryIso)

    return acc
  }, {})

  // Build an array of {cycleName; data} object for every cycle.
  const dataArray = await Promise.all(
    Object.entries(cycleCountries).map<Promise<{ cycleName: CycleName; data: RecordAssessmentData }>>(
      async ([cycleName, countryIsos]) => {
        const cycle = Assessments.getCycle({ assessment, cycleName: cycleName as CycleName })
        const params = {
          assessment,
          cycle,
          countryISOs: countryIsos,
          excludeOdpTable,
          tableNames,
          variables,
          columns,
          mergeOdp,
        }
        const data = await getData(params, client)
        return { cycleName: cycleName as CycleName, data }
      }
    )
  )

  // Build response RecordAssessmentData.
  return dataArray.reduce<RecordAssessmentData>(
    (acc, { cycleName, data }) => {
      // Merge data.
      const cycleData = RecordAssessmentDatas.getCycleData({ data, assessmentName, cycleName })
      acc[assessmentName][publishedCycleName] = { ...acc[assessmentName][publishedCycleName], ...cycleData }
      return acc
    },
    { [assessmentName]: { [publishedCycleName]: {} } }
  )
}
