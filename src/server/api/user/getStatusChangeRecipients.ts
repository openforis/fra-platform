import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'
import { AssessmentStatus } from '@meta/area/country'
import { UserRoles } from '@meta/user/userRoles'

import { AssessmentController } from '@server/controller/assessment'
import { UserRepository } from '@server/repository/public/user'
import Requests from '@server/utils/requests'

export const getStatusChangeRecipients = async (req: CycleRequest<{ status: AssessmentStatus }>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, status } = req.query

    const { cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const recipients = await UserRepository.readCountryUsersByRole({
      countryISOs: [countryIso],
      cycle,
      roles: UserRoles.getRecipientRoles({ status }),
    })

    Requests.sendOk(res, recipients)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
