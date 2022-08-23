import { Request, Response } from 'express'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller/settings'
import Requests from '@server/utils/requests'

export const init = async (req: Request, res: Response) => {
  const { name } = req.query as { name: string }

  try {
    const settings = await SettingsController.read()
    const props = name ? { name } : { id: settings.defaultAssessmentId }
    const { assessment, cycle } = await AssessmentController.getOneWithCycle(props)

    const [countries, regionGroups] = await Promise.all([
      AreaController.getCountries({ assessment, cycle }),
      AreaController.getRegionGroups({ assessment, cycle }),
    ])

    res.send({
      assessment,
      countries,
      regionGroups,
      user: Requests.getRequestUser(req),
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
