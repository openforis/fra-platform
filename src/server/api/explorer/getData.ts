import { Request, Response } from 'express'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { AreaController } from 'server/controller/area'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type GetDataParams = {
  assessmentName: AssessmentName
  columns: Array<string>
  countryISOs: Array<CountryIso>
  tableNames: Array<string>
  variables: Array<string>
}
type GetDataRequest = Request<never, never, Body, GetDataParams>

const excludeOdpTable = true
const mergeOdp = true

export const getData = async (req: GetDataRequest, res: Response): Promise<void> => {
  try {
    const { assessmentName, columns, countryISOs, tableNames, variables } = req.query

    const { assessment } = req.context
    const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
    const countriesMap = await AreaController.getCountriesMap({ assessment, cycle: lastPublishedCycle })
    const publishedCycleName = lastPublishedCycle.name

    // build a record of cycleName->countryISOs, where cycleName is lastPublished cycle for the given countries
    const cycleCountries = countryISOs.reduce<Record<CycleName, Array<CountryIso>>>((acc, countryIso) => {
      const country = countriesMap[countryIso]
      const { cycleName } = country.lastPublishedInfo

      if (!acc[cycleName]) acc[cycleName] = []
      acc[cycleName].push(countryIso)

      return acc
    }, {})

    // build an array of {cycleName; data} object for every cycle
    const dataArray = await Promise.all(
      Object.entries(cycleCountries).map<Promise<{ cycleName: CycleName; data: RecordAssessmentData }>>(
        async ([cycleName, countryIsos]) => {
          const cycle = Assessments.getCycle({ assessment, cycleName })
          const props = {
            assessment,
            cycle,
            countryISOs: countryIsos,
            excludeOdpTable,
            tableNames,
            variables,
            columns,
            mergeOdp,
          }
          const data = await CycleDataController.getTableData(props)
          return { cycleName, data }
        }
      )
    )

    // build response RecordAssessmentData
    const data = dataArray.reduce<RecordAssessmentData>(
      (acc, { cycleName, data }) => {
        // merge data
        const cycleData = RecordAssessmentDatas.getCycleData({ data, assessmentName, cycleName })
        acc[assessmentName][publishedCycleName] = { ...acc[assessmentName][publishedCycleName], ...cycleData }
        return acc
      },
      { [assessmentName]: { [publishedCycleName]: {} } }
    )

    Requests.send(res, data)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
