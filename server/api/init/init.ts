import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { SettingsController } from '@server/controller/settings'

export const init = async (req: Request, res: Response) => {
  const assessmentName = req.query.name as string
  try {
    let assessment
    if (!assessmentName) {
      const settings = await SettingsController.read()

      assessment = await AssessmentController.getOne({
        id: settings.defaultAssessmentId,
      })
    } else {
      assessment = await AssessmentController.getOne({
        name: assessmentName,
      })
    }

    const [countryISOs, regionGroups] = await Promise.all([
      AssessmentController.getCountryISOs({ name: assessment.props.name }),
      AssessmentController.getRegionGroups({ name: assessment.props.name }),
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
