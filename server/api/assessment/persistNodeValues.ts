import { Request, Response } from 'express'

import { Params } from '@client/store/pages/assessmentSection/actions/updateNodeValues'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const persistNodeValues = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, tableName, values } = req.body as Params

    const user = Requests.getRequestUser(req)
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: assessmentName,
      cycleName,
      metaCache: true,
    })

    await Promise.all(
      values.map((valueUpdate) =>
        CycleDataController.persistNodeValue({
          countryIso,
          assessment,
          cycle,
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
