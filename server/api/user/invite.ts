import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { RoleName } from '@meta/user'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const invite = async (req: Request, res: Response) => {
  try {
    const {
      countryIso,
      assessmentName,
      cycleName,
      email,
      name,
      role: roleName,
    } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      email: string
      name: string
      role: RoleName
    }

    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const { user: invitedUser } = await UserController.invite({
      countryIso,
      assessment,
      cycle,
      name,
      email,
      roleName,
      user,
    })

    Requests.sendOk(res, invitedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
