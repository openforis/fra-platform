import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getMany = async (req: CycleRequest<{ print: boolean }>, res: Response) => {
  const { countryIso, assessmentName, cycleName, print } = req.query

  try {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    let users = await UserController.getMany({
      countryIso,
      assessment,
      cycle,
    })

    if (print)
      users = users.filter((user) => !(process.env.FRA_REPORT_COLLABORATORS_EXCLUDED ?? []).includes(user.email))

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
