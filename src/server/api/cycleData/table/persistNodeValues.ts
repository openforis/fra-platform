import { Response } from 'express'

import { CycleDataRequest, NodesBody } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const persistNodeValues = async (req: CycleDataRequest<never, NodesBody>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName } = req.query
    const { tableName, values } = req.body

    const user = Requests.getUser(req)
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    await CycleDataController.persistNodeValues({
      nodeUpdates: {
        assessment,
        cycle,
        countryIso,
        nodes: values.map(({ colName, value, variableName }) => ({ colName, variableName, value, tableName })),
      },
      sectionName,
      user,
    })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
