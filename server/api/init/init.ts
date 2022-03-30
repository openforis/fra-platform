import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller/settings'

export const init = async (req: Request, res: Response) => {
  const assessmentName = req.query.name as string
  try {
    let assessment
    let cycle
    if (!assessmentName) {
      const settings = await SettingsController.read()
      ;({ assessment, cycle } = await AssessmentController.getOneWithCycle({
        id: settings.defaultAssessmentId,
      }))
    } else {
      ;({ assessment, cycle } = await AssessmentController.getOneWithCycle({
        name: assessmentName,
      }))
    }

    const [countryISOs, regionGroups] = await Promise.all([
      AssessmentController.getCountryISOs({ assessment, cycle }),
      AssessmentController.getRegionGroups({ assessment, cycle }),
    ])

    res.send({
      assessment,
      countryISOs,
      regionGroups,
      user: Requests.getRequestUser(req),
    })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
