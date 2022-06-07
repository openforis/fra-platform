import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { RoleName } from '@meta/user'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const invite = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, email, name, roleName } = req.query as {
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      email: string
      name: string
      roleName: RoleName
    }
    const user = Requests.getRequestUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    UserController.invite({ countryIso, assessment, cycle, name, email, roleName, user, url: '' })

    Requests.sendOk(res)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
