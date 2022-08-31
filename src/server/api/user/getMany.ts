import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getMany = async (req: CycleRequest, res: Response) => {
  const { countryIso, assessmentName, cycleName } = req.query

  try {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const users = await UserController.getMany({
      countryIso,
      assessment,
      cycle,
    })

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
