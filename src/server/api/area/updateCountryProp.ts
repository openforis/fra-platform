import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { Country } from 'meta/area'
import { TableNames } from 'meta/assessment'
import { NodeUpdates, RecordAssessmentDatas } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies'
import Requests from 'server/utils/requests'

type Body = { [propName: string]: { useOriginalDataPoint: boolean } }
type Request = CycleDataRequest<never, Body>

const metaCache = true
const tableName = TableNames.forestCharacteristics
const tableNames = [tableName]

export const updateCountryProp = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query
    const { countryProp } = req.body
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    // 1. update database country prop
    const countrySource = await AreaController.getCountry({ assessment, cycle, countryIso })
    const country: Country = { ...countrySource, props: { ...countrySource.props, ...countryProp } }
    const updatedCountry = await AreaController.updateCountry({ assessment, cycle, countryIso, country, user })

    // 2. get table data
    const countryISOs = [countryIso]
    const mergeOdp = updatedCountry.props.forestCharacteristics.useOriginalDataPoint
    const data = await CycleDataController.getTableData({ assessment, cycle, countryISOs, mergeOdp, tableNames })
    const tableData = RecordAssessmentDatas.getTableData({ assessmentName, cycleName, countryIso, tableName, data })

    // 3. schedule update dependencies
    const nodeUpdates = Object.entries(tableData).reduce<NodeUpdates>(
      (acc, [colName, recordRowData]) => {
        Object.entries(recordRowData).forEach(([variableName, value]) => {
          acc.nodes.push({ tableName, variableName, colName, value })
        })
        return acc
      },
      { assessmentName, cycleName, countryIso, nodes: [] }
    )
    await scheduleUpdateDependencies({ assessment, cycle, nodeUpdates, user })

    // 4. send updated country to client
    Requests.send(res, updatedCountry)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
