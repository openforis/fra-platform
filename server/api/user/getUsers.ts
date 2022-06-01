import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getUsers = async (req: Request, res: Response) => {
  const { countryIso, assessmentName, cycleName } = req.query as {
    countryIso: CountryIso
    assessmentName: AssessmentName
    cycleName: string
  }

  try {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: String(assessmentName),
      cycleName: String(cycleName),
    })

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
