import { Response } from 'express'

import { InitRequest } from '@meta/api/request'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller/settings'
import Requests from '@server/utils/requests'

export const init = async (req: InitRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const settings = await SettingsController.read()
    const props = assessmentName ? { assessmentName } : { id: settings.defaultAssessmentId }
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ ...props, cycleName })

    const regionGroups = await AreaController.getRegionGroups({ assessment, cycle })

    Requests.sendOk(res, {
      assessment,
      regionGroups,
      user: Requests.getRequestUser(req),
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
