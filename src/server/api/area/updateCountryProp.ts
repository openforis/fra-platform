import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { Country, CountryProps } from 'meta/area/country'
import { TableNames } from 'meta/assessment/table'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { AreaController } from 'server/controller/area'
import { TableDataController } from 'server/controller/cycleData/tableData'
import { updateDependents } from 'server/controller/cycleData/tableData/updateDependencies/updateDependents'
import { DB } from 'server/db/db'
import Requests from 'server/utils/requests'

type Body = { countryProp: Partial<CountryProps> }
type Request = CycleDataRequest<never, Body>

const tableName = TableNames.forestCharacteristics
const tableNames = [tableName]

export const updateCountryProp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessmentName, countryIso, cycleName } = req.query
    const { assessment, country: countrySource, cycle } = req.context
    const { countryProp } = req.body
    const user = Requests.getUser(req)

    // 1. update database country prop
    const country: Country = { ...countrySource, props: { ...countrySource.props, ...countryProp } }
    const updatedCountry = await AreaController.updateCountry({
      assessment,
      cycle,
      country,
      user,
      lastEdit: true,
      lastUpdate: true,
    })

    if (Object.keys(countryProp).includes('forestCharacteristics')) {
      // 2. get table data
      const countryISOs = [countryIso]
      const mergeOdp = updatedCountry.props.forestCharacteristics.useOriginalDataPoint
      const data = await TableDataController.getData({ assessment, cycle, countryISOs, mergeOdp, tableNames })
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
      await updateDependents({ assessment, cycle, country: updatedCountry, nodeUpdates, user }, DB)
    }

    // 4. send updated country to client
    Requests.send(res, updatedCountry)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
