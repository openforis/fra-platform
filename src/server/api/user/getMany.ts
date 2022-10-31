import { Response } from 'express'

import { UsersRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { ProcessEnv } from '@server/utils'
import Requests from '@server/utils/requests'

export const getMany = async (req: UsersRequest<{ print: string; limit?: string; offset?: string }>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, print, limit, offset } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    let users = await UserController.getMany({
      countryIso,
      assessment,
      cycle,
      limit: limit && Number(limit),
      offset: offset && Number(offset),
    })

    if (print && print === 'true')
      users = users.filter((user) => !ProcessEnv.fraReportCollaboratorsExcluded.includes(user.email))

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
