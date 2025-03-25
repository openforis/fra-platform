import { Response } from 'express'

import { CycleDataRequest, NodesBody } from 'meta/api/request'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const persistNodeValues = async (req: CycleDataRequest<never, NodesBody>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName } = req.query
    const { tableName, values } = req.body

    const user = Requests.getUser(req)
    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    const nodes = values.map<NodeUpdate>(({ variableName, colName, value }) => {
      return { tableName, variableName, colName, value }
    })
    const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
    await CycleDataController.persistNodeValues({ assessment, cycle, nodeUpdates, sectionName, user })

    await AreaController.updateCountryStatus({ assessment, cycle, countryIso, user })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
