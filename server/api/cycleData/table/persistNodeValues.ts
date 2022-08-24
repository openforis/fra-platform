import { Response } from 'express'

import { CycleDataRequest, NodesBody } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const persistNodeValues = async (req: CycleDataRequest<never, NodesBody>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, section } = req.query
    const { tableName, values } = req.body

    const user = Requests.getRequestUser(req)
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    await Promise.all(
      values.map((valueUpdate) =>
        CycleDataController.persistNodeValue({
          countryIso,
          assessment,
          cycle,
          section,
          tableName,
          user,
          ...valueUpdate,
        })
      )
    )

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
