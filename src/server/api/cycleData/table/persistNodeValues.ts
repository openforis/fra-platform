import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request/cycleData/cycleData'
import { NodesBody } from 'meta/api/request/cycleData/table'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'

import { TableDataController } from 'server/controller/cycleData/tableData'
import Requests from 'server/utils/requests'

export const persistNodeValues = async (req: CycleDataRequest<never, NodesBody>, res: Response): Promise<void> => {
  try {
    const { assessmentName, cycleName, sectionName } = req.query
    const { tableName, values } = req.body
    const { assessment, country, cycle } = req.context
    const { countryIso } = country
    const user = Requests.getUser(req)

    const nodes = values.map<NodeUpdate>(({ colName, value, variableName }) => {
      return { tableName, variableName, colName, value }
    })
    const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
    await TableDataController.persistNodeValues({ assessment, cycle, country, nodeUpdates, sectionName, user })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
