import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { ProcessEnv } from 'server/utils'
import Requests from 'server/utils/requests'

export const getMany = async (req: CycleRequest<{ print: string }>, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, print } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    let users = await UserController.getMany({
      assessment,
      countryIso,
      cycle,
    })

    if (print && print === 'true')
      users = users.filter((user) => !ProcessEnv.fraReportCollaboratorsExcluded.includes(user.email))

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
