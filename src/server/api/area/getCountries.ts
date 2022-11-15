import { Response } from 'express'

import { InitRequest } from '@meta/api/request'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller/settings'
import Requests from '@server/utils/requests'

export const getCountries = async (req: InitRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const settings = await SettingsController.read()
    const props = assessmentName ? { assessmentName } : { id: settings.defaultAssessmentId }
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ ...props, cycleName })

    const countries = await AreaController.getCountries({ assessment, cycle })

    Requests.sendOk(res, countries)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
